const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = './users.db';

// --- MIDDLEWARE ---
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve static files
app.use(session({
    secret: 'orienta_secret_key_12345', // Change this in production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// --- DATABASE SETUP ---
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to SQLite database.');
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            profile_data TEXT
        )`);
    }
});

// --- HELPER FUNCTIONS ---
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};

// --- API ROUTES ---

// Register
app.post('/api/register', async (req, res) => {
    const { name, email, password, level, stream } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        // Store technical level/stream in profile_data
        const initialProfile = JSON.stringify({ level: level || "", stream: stream || "" });

        db.run('INSERT INTO users (name, email, password, profile_data) VALUES (?, ?, ?, ?)',
            [name, email, hash, initialProfile],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                // Auto-login after register
                req.session.userId = this.lastID;
                req.session.userName = name;
                res.status(201).json({ message: 'Compte créé avec succès !', user: { name, email } });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur.' });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé.' });

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.id;
            req.session.userName = user.name;
            req.session.isAdmin = (user.email === 'admin@orienta.com');
            res.json({ message: 'Connexion réussie !', user: { name: user.name, email: user.email, isAdmin: req.session.isAdmin } });
        } else {
            res.status(400).json({ error: 'Mot de passe incorrect.' });
        }
    });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Déconnexion réussie.' });
});

// Get Profile
app.get('/api/profile', isAuthenticated, (req, res) => {
    db.get('SELECT name, email, profile_data FROM users WHERE id = ?', [req.session.userId], (err, row) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur.' });
        if (!row) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        const profileData = row.profile_data ? JSON.parse(row.profile_data) : {};
        // Merge core user data with profile data
        const fullProfile = {
            name: row.name,
            email: row.email,
            ...profileData
        };
        res.json({ profile: fullProfile });
    });
});

// Save Profile
app.post('/api/profile', isAuthenticated, (req, res) => {
    const profileData = JSON.stringify(req.body);
    db.run('UPDATE users SET profile_data = ? WHERE id = ?', [profileData, req.session.userId], (err) => {
        if (err) return res.status(500).json({ error: 'Erreur sauvegarde.' });
        res.json({ message: 'Profil sauvegardé.' });
    });
});

// Get Stats (Admin)
app.get('/api/stats', (req, res) => {
    db.all('SELECT profile_data FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur.' });

        let stats = {
            totalUsers: rows.length,
            levels: {},
            streams: {},
            quizRun: 0
        };

        rows.forEach(row => {
            try {
                const data = JSON.parse(row.profile_data || '{}');
                // Count Levels
                if (data.level) {
                    stats.levels[data.level] = (stats.levels[data.level] || 0) + 1;
                }
                // Count Streams
                if (data.stream) {
                    stats.streams[data.stream] = (stats.streams[data.stream] || 0) + 1;
                }
                // Count Quizzes
                if (data.quiz) {
                    stats.quizRun++;
                }
            } catch (e) {
                console.error("Error parsing JSON for stats", e);
            }
        });

        res.json(stats);
    });
});

// Admin Users List
app.get('/api/admin/users', isAuthenticated, (req, res) => {
    if (!req.session.isAdmin) return res.status(403).json({ error: 'Accès interdit.' });

    db.all('SELECT id, name, email, profile_data FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur.' });

        const users = rows.map(row => {
            try {
                const profile = row.profile_data ? JSON.parse(row.profile_data) : {};
                return {
                    id: row.id,
                    name: row.name,
                    email: row.email,
                    level: profile.level || 'Non renseigné',
                    stream: profile.stream || 'Non renseigné',
                    quiz: profile.quiz ? (profile.quiz.codes + ' (' + profile.quiz.profiles.cognitif + ')') : 'Non passé'
                };
            } catch (e) {
                return { id: row.id, name: row.name, email: row.email, level: 'Erreur', stream: 'Erreur', quiz: 'Erreur' };
            }
        });
        res.json({ users });
    });
});

// Check Session
app.get('/api/session', (req, res) => {
    if (req.session.userId) {
        res.json({ authenticated: true, user: { name: req.session.userName, isAdmin: req.session.isAdmin } });
    } else {
        res.json({ authenticated: false });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
