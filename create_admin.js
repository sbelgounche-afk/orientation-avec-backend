const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const DB_PATH = './users.db';

const db = new sqlite3.Database(DB_PATH);

const createAdmin = async () => {
    const password = 'admin'; // Mot de passe simple
    const hash = await bcrypt.hash(password, 10);
    const email = 'admin@orienta.com';
    const name = 'Administrateur';
    const profile = JSON.stringify({ level: 'Admin', stream: 'Admin' });

    db.run(`INSERT OR REPLACE INTO users (name, email, password, profile_data) VALUES (?, ?, ?, ?)`,
        [name, email, hash, profile], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Admin user created with ID ${this.lastID}`);
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        });
};

createAdmin();
