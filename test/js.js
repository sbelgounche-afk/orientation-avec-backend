// --- 
// script de test.html  
// DONNÉES (COURTE POUR L'EXEMPLE - A INSÉRER ICI TOUTE LA BASE RAW_DATA DU MESSAGE PRÉCÉDENT) ---
// Note: Pour que ce code fonctionne, tu dois coller l'objet RAW_DATA complet fourni précédemment ici.
// Ci-dessous une version raccourcie pour l'exécution immédiate.
const RAW_DATA = {
    "Informatique": ["Développeur web", "Ingénieur informatique", "Administrateur réseaux", "Data Scientist", "Chef de projet digital"],
    "Santé": ["Infirmier", "Médecin", "Kinésithérapeute", "Psychologue", "Diététicien"],
    "Btp": ["Maçon", "Électricien", "Architecte", "Ingénieur BTP", "Plombier"],
    "Commerce": ["Commercial", "Chef de rayon", "Manager de magasin", "Acheteur", "Négociateur immobilier"],
    "Artisanat": ["Boulanger", "Couturier", "Menuisier", "Ébéniste", "Fleuriste"],
    "Enseignement": ["Professeur des écoles", "Professeur de langue", "Formateur", "Educateur spécialisé"]
};

const RIASEC_TO_SECTORS = {
    'R': ['Btp', 'Artisanat'],
    'I': ['Informatique', 'Santé'],
    'A': ['Artisanat'],
    'S': ['Santé', 'Enseignement'],
    'E': ['Commerce'],
    'C': ['Commerce'] // Conventionnel souvent lié aux chiffres/admin
};

const CUSTOM_DESC = {
    "Développeur web": "Crée des sites web et des applications mobiles.",
    "Infirmier": "Soigne les patients et assiste les médecins.",
    "Maçon": "Construit les murs et structures des bâtiments.",
    "Commercial": "Vend des produits ou services et gère la relation client."
};

const TAGS_DATA = {
    "Technique": "Logique, Machines, Outils",
    "Social": "Aide, Contact humain, Écoute",
    "Créatif": "Innovation, Design, Imagination",
    "Gestion": "Organisation, Chiffres, Planification"
};

// --- ETAT & LOGIQUE ---
const state = {
    step: 0,
    answers: { q1: null, q1_sub: null, q2: null, q3: null, q4: null, q5: null, q6: null, q7: null, q8: null, q9: null },
    loaded: false
};

const questions = [
    { id: 1, text: "Quand tu penses à ton avenir, te sens-tu :", options: [{ label: "Motivé", val: "A" }, { label: "Indécis", val: "B" }, { label: "Bloqué", val: "C" }] },
    { id: 2, text: "Tu es le plus motivé quand :", options: [{ label: "Tu choisis librement", val: "A" }, { label: "Tu réussis", val: "B" }, { label: "Tu es utile", val: "C" }] },
    { id: 3, text: "Tu préfères :", options: [{ label: "Réfléchir", val: "A" }, { label: "Créer", val: "B" }, { label: "Aider", val: "C" }, { label: "Faire/Manipuler", val: "D" }, { label: "Organiser", val: "E" }] },
    { id: 4, text: "Tu préfères travailler avec :", options: [{ label: "Idées", val: "ideas" }, { label: "Chiffres", val: "numbers" }, { label: "Personnes", val: "people" }, { label: "Objets", val: "objects" }] },
    { id: 5, text: "Tu apprends mieux :", options: [{ label: "En faisant", val: "A" }, { label: "En observant", val: "B" }, { label: "En testant", val: "C" }] },
    { id: 6, text: "Face à une difficulté :", options: [{ label: "Persévérer seul", val: "A" }, { label: "Demander de l'aide", val: "B" }, { label: "Abandonner", val: "C" }] },
    { id: 7, text: "Tu préfères :", options: [{ label: "Cadre strict", val: "A" }, { label: "Grande autonomie", val: "B" }, { label: "Équilibre", val: "C" }] },
    { id: 8, text: "Tu te projettes vers :", options: [{ label: "Études longues", val: "A" }, { label: "Études courtes", val: "B" }, { label: "Pratique/Alternance", val: "C" }] },
    { id: 9, text: "Si tu étais sûr de ne pas te tromper, tu choisirais :", options: [{ label: "Ce que tu aimes", val: "A" }, { label: "Ce où tu es bon", val: "B" }, { label: "Ce qui est stable", val: "C" }, { label: "Ce qui a du sens", val: "D" }] }
];

// --- INITIALISATION ---
window.onload = function () {
    if (localStorage.getItem('orientState')) {
        const saved = JSON.parse(localStorage.getItem('orientState'));
        if (confirm("Une session précédente a été trouvée. Voulez-vous la reprendre ?")) {
            state.answers = saved;
            // Calculer l'étape manuellement basée sur les réponses
            let step = 0;
            if (state.answers.q1) step++;
            if (state.answers.q2) step++;
            // ... simplification ici pour l'exemple
            state.step = 0; // On remet à 0 pour simplifier la démo ou implémenter logique complète
            document.getElementById('savedMsg').style.display = 'block';
        } else {
            localStorage.removeItem('orientState');
        }
    }
};

function saveState() {
    localStorage.setItem('orientState', JSON.stringify(state.answers));
}

function startQuiz() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('quiz').classList.add('active');
    renderQuestion();
}

function renderQuestion() {
    const qData = questions[state.step];
    const progress = ((state.step) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('stepCount').innerText = state.step + 1;
    document.getElementById('questionTitle').innerText = qData.text;

    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    document.getElementById('prevBtn').style.display = state.step === 0 ? 'none' : 'inline-flex';

    qData.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span>${opt.label}</span>`;
        btn.onclick = () => handleAnswer(opt.val);
        container.appendChild(btn);
    });
}

function handleAnswer(val) {
    const qId = questions[state.step].id;
    if (qId === 1) {
        state.answers.q1 = val;
        if (val === 'C') { document.getElementById('quiz').classList.remove('active'); document.getElementById('q1-subscreen').classList.add('active'); saveState(); return; }
    } else if (qId === 2) state.answers.q2 = val;
    else if (qId === 3) state.answers.q3 = val;
    else if (qId === 4) state.answers.q4 = val;
    else if (qId === 5) state.answers.q5 = val;
    else if (qId === 6) state.answers.q6 = val;
    else if (qId === 7) state.answers.q7 = val;
    else if (qId === 8) state.answers.q8 = val;
    else if (qId === 9) state.answers.q9 = val;

    saveState();
    nextStep();
}

function handleSubAnswer(val) {
    state.answers.q1_sub = val;
    document.getElementById('q1-subscreen').classList.remove('active');
    document.getElementById('quiz').classList.add('active');
    saveState();
    nextStep();
}

function prevStep() {
    if (state.step > 0) {
        state.step--;
        renderQuestion();
    }
}

function nextStep() {
    state.step++;
    if (state.step < questions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz').classList.remove('active');
    document.getElementById('results').classList.add('active');
    localStorage.removeItem('orientState'); // Clean up

    // Calcul Profil
    const q3 = state.answers.q3;
    let primary = q3 === 'A' ? 'I' : q3 === 'B' ? 'A' : q3 === 'C' ? 'S' : q3 === 'D' ? 'R' : 'E';
    const q4 = state.answers.q4;
    let secondary = q4 === 'ideas' ? 'I' : q4 === 'numbers' ? 'C' : q4 === 'people' ? 'S' : 'R';
    if (primary === secondary) secondary = (primary === 'I') ? 'T' : 'R'; // Heuristique simple

    const riasecCode = primary + secondary;

    // --- SYNC WITH MAIN DASHBOARD (API) ---
    const quizData = {
        codes: riasecCode,
        scores: { [primary]: 10, [secondary]: 8 },
        profiles: { cognitif: state.answers.q5 === 'A' ? "Actif" : "Réflexif", autonomie: state.answers.q7 === 'A' ? "Structuré" : "Autonome" }
    };

    // 1. Get current profile from API
    fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
            let userProfile = data.profile || { name: 'Visiteur', level: '', stream: '' };
            userProfile.quiz = quizData;

            // 2. Save back to API
            return fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userProfile)
            });
        })
        .then(() => console.log("Profil synchronisé (API)"))
        .catch(e => console.error("Erreur synchro API:", e));
    // -----------------------------------------------

    document.getElementById('riasecResult').innerText = riasecCode;
    document.getElementById('learningResult').innerText = state.answers.q5 === 'A' ? "Actif" : "Réflexif";
    document.getElementById('motivationResult').innerText = state.answers.q2 === 'A' ? "Autonomie" : "Compétence";
    document.getElementById('frameworkResult').innerText = state.answers.q7 === 'A' ? "Structuré" : "Autonome";

    drawRadarChart(primary, secondary);
    generateJobs(primary, secondary);
    generateRecommendation(primary, secondary);

    // Setup Search
    document.getElementById('searchInput').addEventListener('input', (e) => searchJobs(e.target.value));
}

// --- GRAPHIQUE RADAR (CANVAS) ---
function drawRadarChart(pri, sec) {
    const canvas = document.getElementById('radarChart');
    const ctx = canvas.getContext('2d');
    // Set resolution
    canvas.width = 300;
    canvas.height = 300;

    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const labels = ['Réaliste', 'Investigateur', 'Artistic', 'Social', 'Entrep.', 'Conventionnel'];

    // Mock scores based on profile
    const scores = {
        'R': pri === 'R' ? 1 : (sec === 'R' ? 0.7 : 0.3),
        'I': pri === 'I' ? 1 : (sec === 'I' ? 0.7 : 0.3),
        'A': pri === 'A' ? 1 : (sec === 'A' ? 0.7 : 0.3),
        'S': pri === 'S' ? 1 : (sec === 'S' ? 0.7 : 0.3),
        'E': pri === 'E' ? 1 : (sec === 'E' ? 0.7 : 0.3),
        'C': pri === 'C' ? 1 : (sec === 'C' ? 0.7 : 0.3),
    };

    // Draw web
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let r = 20; r <= radius; r += 20) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Draw axes
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        const lx = centerX + Math.cos(angle) * (radius + 15);
        const ly = centerY + Math.sin(angle) * (radius + 15);
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], lx, ly);
    }

    // Draw Data
    ctx.beginPath();
    ctx.strokeStyle = 'var(--secondary)';
    ctx.fillStyle = 'rgba(0, 150, 136, 0.2)';
    ctx.lineWidth = 2;

    for (let i = 0; i < 6; i++) {
        const letter = labels[i][0];
        const val = scores[letter] || 0.2;
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * val);
        const y = centerY + Math.sin(angle) * (radius * val);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
}

// --- JOBS & MODAL ---
function generateJobs(pri, sec) {
    const container = document.getElementById('jobContainer');
    container.innerHTML = '';

    const targetSectors = RIASEC_TO_SECTORS[pri] || [];

    // Display recommended jobs
    targetSectors.forEach(secName => {
        const jobs = RAW_DATA[secName] || [];
        jobs.slice(0, 2).forEach(job => createJobCard(job, secName, true, container));
    });
}

function createJobCard(job, sector, isMatch, container) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.onclick = () => openModal(job, sector, isMatch);
    card.innerHTML = `
                <div class="job-header">
                    <div class="job-title">${job}</div>
                    <div class="job-category">${sector}</div>
                </div>
                <div class="job-body">
                    <p>${CUSTOM_DESC[job] || "Métier compatible avec votre profil."}</p>
                </div>
                <div class="job-footer">
                    ${isMatch ? '<span class="match-tag">Recommandé</span>' : '<span class="explore-tag">Exploration</span>'}
                    <span>Voir détails &rarr;</span>
                </div>
            `;
    container.appendChild(card);
}

function searchJobs(query) {
    const container = document.getElementById('jobContainer');
    container.innerHTML = '';
    if (!query) { generateJobs(document.getElementById('riasecResult').innerText[0], null); return; }

    const q = query.toLowerCase();
    Object.keys(RAW_DATA).forEach(sector => {
        const jobs = RAW_DATA[sector].filter(j => j.toLowerCase().includes(q));
        jobs.forEach(job => createJobCard(job, sector, false, container));
    });
}

function openModal(job, sector, isMatch) {
    const modal = document.getElementById('jobModal');
    document.getElementById('modalTitle').innerText = job;
    document.getElementById('modalCategory').innerText = sector;
    document.getElementById('modalDesc').innerText = CUSTOM_DESC[job] || `Professionnel du secteur ${sector}. Activités techniques et relationnelles variées.`;

    const tagsDiv = document.getElementById('modalTags');
    tagsDiv.innerHTML = '';

    if (isMatch) tagsDiv.innerHTML += `<span style="background:var(--secondary); color:white; padding:4px 8px; border-radius:4px; font-size:0.8rem;">Profil RIASEC Compatible</span>`;

    // Mocked tags based on sector
    if (sector === 'Informatique') tagsDiv.innerHTML += `<span style="border:1px solid #ccc; padding:4px 8px; border-radius:4px; font-size:0.8rem;">Logique</span>`;
    if (sector === 'Santé') tagsDiv.innerHTML += `<span style="border:1px solid #ccc; padding:4px 8px; border-radius:4px; font-size:0.8rem;">Social</span>`;

    modal.classList.add('open');
}

function closeModal() {
    document.getElementById('jobModal').classList.remove('open');
}

function generateRecommendation(pri, sec) {
    const txt = `Votre profil est principalement <strong>${pri}</strong>. `;
    txt += `Basé sur vos réponses, les secteurs comme <strong>${RIASEC_TO_SECTORS[pri].join(', ')}</strong> sont des environnements favorables. `;
    txt += `Votre motivation pour la ${document.getElementById('motivationResult').innerText} est un atout clé dans votre réussite.`;
    document.getElementById('recommendationText').innerHTML = txt;
}

function resetApp() {
    if (confirm("Voulez-vous vraiment tout effacer et recommencer ?")) {
        localStorage.removeItem('orientState');
        location.reload();
    }
}

// Close modal on outside click
window.onclick = function (event) {
    const modal = document.getElementById('jobModal');
    if (event.target == modal) {
        closeModal();
    }
}