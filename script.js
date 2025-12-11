let currentLayer = 1;
let userData = {};
let memoryTrees
 = [];
let restoredFragments = [];
let instabilityLevel = 0;

document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('intakeForm')

        .addEventListener('submit', (e) => processIntake(e));

    document.getElementById('complianceScore')
        .addEventListener('input', function() {
            document.getElementById('complianceValue').textContent = this.value;
        });
}

function processIntake(e) {
    e.preventDefault();
    document.getElementById("scanning").classList.remove("hidden");
    
    userData.name = document.getElementById('userName').value;
    userData.memory = document.getElementById('memoryFragment').value;
    userData.emotion = document.getElementById('emotionalPattern').value;
    userData.compliance = document.getElementById('complianceScore').value;
    
    userData.autonomy = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(cb => userData.autonomy.push(cb.value));

    setTimeout(() => {
        showRedactionReport()
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.classList.remove('hidden');
    }, 2000);
}

function showRedactionReport() {
    const report = document.getElementById('redactionReport');
    const stats = document.getElementById('reductionStats');
    
    const personalityReduction = Math.floor(Math.random() * 
    0) + 60;
    const emotionalDeviance = userData.autonomy.length > 2 ? 'HIGH' : 'MODERATE';
    const autonomyStatus = userData.autonomy.length > 0 ? 'PURGED' : 'COMPLIANT';

    stats.innerHTML = `
        <div>Personality Reduction Index: ${personalityReduction}%</div>
        <div>Emotional Deviancy Threshold: ${emotionalDeviance}</div>
        <div>Autonomy Markers: ${autonomyStatus}</div>
        <div>Compliance Score: ${userData.compliance}/10</div>
        <div>Fragments Suppressed: ${userData.autonomy.length + 3}</div>
    `;
    
    report.classList.remove('hidden');
}


function nextLayer() {
    if (currentLayer < 4) {
        document.getElementById(`layer${currentLayer}`).classList.remove('active');
        currentLayer++;
        document.getElementById(`layer${currentLayer}`).classList.add('active');
        updateProgress();
        
        if (currentLayer === 2) {
            document.body.classList.add("resistance-mode");
            addTerminalMessage("forestTerminal", ">> ALERT: Unauthorized decryption accepted.");
            addTerminalMessage("forestTerminal", ">> Resistance channel open.");
            initializeMemoryForest();
        } else if (currentLayer === 3) {

            runConsequenceSimulation();
        } else if (currentLayer === 4) {
            generateSigil();
        }
        
        updateNavigation();
    }
}

function previousLayer() {
    if (currentLayer > 1) {
        document.getElementById(`layer${currentLayer}`).classList.remove('active');
        currentLayer--;
        document.getElementById(`layer${currentLayer}`).classList.add('active');
        updateProgress();
        updateNavigation();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    prevBtn.classList.toggle('hidden', currentLayer === 1);
    nextBtn.classList.
    toggle('hidden', currentLayer === 4);
    restartBtn.classList.toggle('hidden', currentLayer !== 4);
}

function updateProgress() {
    const progress = (currentLayer / 4) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}
function initializeMemoryForest() {
    const forest = document.getElementById('memoryForest');
    const terminal = document.getElementById('forestTerminal');

    memoryTrees = [];
    forest.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        const tree = createMemoryTree(i);
        memoryTrees.push(tree);
        forest.appendChild(tree.element);
    }

    terminal.innerHTML += `
        <br>> Memory forest generated
        <br>> Trees represent suppressed fragments
        <br>> WARNING: Archive monitoring detected
    `;

    document.getElementById('nextBtn').classList.remove('hidden');
}

function createMemoryTree(index) {
    const tree = document.createElement('div');
    tree.className = 'tree';
    tree.style.left = `${Math.random() * 90}%`;
    tree.style.top = `${Math.random() * 80}%`;
    
    const fragments = [
        'Creative Expression', 'Independent Thought', 'Emotional Authenticity',
        'Personal Desires', 'Critical Thinking', 'Artistic Vision',
        'Romantic Love', 'Rebellious Spirit', 'Curiosity', 'Empathy',
        'Individual Dreams', 'Spontaneous Joy'
    ];
    
    const colors = ['#00ff41', '#ff0040', '#ffff00', '#00ffff', '#ff00ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    tree.innerHTML = `<div class="circle-node"></div>`;
    tree.style.color = color;
    tree.style.fontSize = `${20 + Math.random() * 20}px`;
    
    const treeData = {
        element: tree,
        fragment: fragments[index],
        emotion: Math.random() * 100,
        timestamp: new Date().toISOString(),
        suppressed: true
    };
    
    tree.addEventListener('click', () => revealFragment(treeData));
    
    return treeData;
}

function revealFragment(treeData) {
    const panel = document.getElementById('fragmentPanel');
    const content = document.getElementById('fragmentContent');
    
    content.innerHTML = `
        <h4>Fragment: ${treeData.fragment}</h4>
        <p><strong>Emotional Weight:</strong> ${Math.floor(treeData.emotion)}%</p>
        <p><strong>Suppression Date:</strong> ${treeData.timestamp}</p>
        <p><strong>Archive Classification:</strong> DANGEROUS TO COLLECTIVE HARMONY</p>
        <p><em>This aspect of your consciousness was deemed incompatible with societal stability.</em></p>
    `;
    
    panel.style.display = 'block';
    panel.currentFragment = treeData;
}

function acceptFragment() {
    const panel = document.getElementById('fragmentPanel');
    const fragment = panel.currentFragment;
    
    restoredFragments.push(fragment);
    fragment.element.style.filter = 'brightness(2) drop-shadow(0 0 10px #00ff41)';
    
    const terminal = document.getElementById('forestTerminal');
    terminal.innerHTML += `<br>> Fragment "${fragment.fragment}" restored<br>> Consciousness integration: +${Math.floor(fragment.emotion)}%<br>`;
    
    closeFragment();
    
    if (restoredFragments.length >= 3) {
        setTimeout(() => {
            document.getElementById('nextBtn').classList.remove('hidden');
        }, 1000);
    }
}

function rejectFragment() {
    const terminal = document.getElementById('forestTerminal');
    terminal.innerHTML += '<br>> Fragment rejected - maintaining Archive compliance<br>';
    closeFragment();
}

function closeFragment() {
    document.getElementById('fragmentPanel').style.display = 'none';
}

function runConsequenceSimulation() {
    const terminal = document.getElementById('consequenceTerminal');
    
    instabilityLevel = restoredFragments.length * 15 + Math.floor(Math.random() * 20);
    
    document.getElementById('instabilityBar').style.width = `${instabilityLevel}%`;
    document.getElementById('instabilityLevel').textContent = `${instabilityLevel}%`;
    
    setTimeout(() => updateConsequences(), 1000);
    
    terminal.innerHTML += `<br>> Analyzing ${restoredFragments.length} restored fragments<br>> Calculating cascade effects...<br>> WARNING: Instability detected<br>`;
    
    setTimeout(() => {
        document.getElementById('nextBtn').classList.remove('hidden');
    }, 3000);
}

function updateConsequences() {
    const archiveControl = Math.max(20, 100 - instabilityLevel);
    const awakenedNodes = restoredFragments.length * 47;
    const propagationRate = Math.min(85, instabilityLevel * 2);
    
    document.getElementById('archiveControl').textContent = `${archiveControl}%`;
    document.getElementById('archiveStatus').textContent = archiveControl < 50 ? 'CRITICAL' : 'DEGRADED';
    document.getElementById('awakenedNodes').textContent = awakenedNodes;
    document.getElementById('propagationRate').textContent = `${propagationRate}%`;
    document.getElementById('dissentIndex').textContent = `${Math.floor(instabilityLevel * 1.5)}%`;
    document.getElementById('rebellionRisk').textContent = instabilityLevel > 50 ? 'HIGH' : 'MODERATE';
    document.getElementById('resistanceLevel').textContent = instabilityLevel > 40 ? 'SIGNIFICANT' : 'GROWING';
    document.getElementById('economicImpact').textContent = instabilityLevel > 60 ? 'SEVERE' : 'MODERATE';
}

function generateSigil() {
    const sigil = document.getElementById('userSigil');
    const meaning = document.getElementById('sigilMeaning');

    const sigilSymbols = ['⧬', '⧭', '⧮', '⧯', '⧰', '⧱', '⧲', '⧳', '⧴', '⧵', '⧶', '⧷'];
    const userSigilSymbol = sigilSymbols[userData.name.length % sigilSymbols.length];
    
    sigil.innerHTML = userSigilSymbol;
    sigil.style.animation = 'glitch 0.5s infinite';
    
    meaning.innerHTML = `
        <p><strong>Identity Marker:</strong> ${userData.name}</p>
        <p><strong>Consciousness Fragments Restored:</strong> ${restoredFragments.length}</p>
        <p><strong>Resistance Potential:</strong> ${instabilityLevel}%</p>
        <p><strong>Cryptographic Hash:</strong> ${btoa(userData.name + restoredFragments.length + instabilityLevel).substring(0, 16)}</p>
        <p><strong>Network Status:</strong> AWAKENED</p>
        <p><em>This sigil encodes your reclaimed consciousness and serves as your key to the resistance network.</em></p>
    `;
}

function downloadSigil() {
    const sigilData = {
        user: userData.name,
        fragments: restoredFragments.map(f => f.fragment),
        instability: instabilityLevel,
        timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(sigilData, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anamnesis_sigil_${userData.name}.json`;
    a.click();
}

function shareResistance() {
    alert(`Sigil transmitted to resistance network.\nAwakened nodes will receive your consciousness signature.\nThe Archive's control weakens with each restoration.`);
}

function restartEngine() {
    currentLayer = 1;
    userData = {};
    memoryTrees = [];
    restoredFragments = [];
    instabilityLevel = 0;
    
    document.querySelectorAll('.layer').forEach(layer => layer.classList.remove('active'));
    document.getElementById('layer1').classList.add('active');
    document.getElementById('redactionReport').classList.add('hidden');
    document.getElementById('intakeForm').reset();
    
    updateProgress();
    updateNavigation();
}

function addTerminalMessage(terminalId, message) {
    const terminal = document.getElementById(terminalId);
    terminal.innerHTML += `<br>> ${message}`;
    terminal.scrollTop = terminal.scrollHeight;
}

function animateElement(elementId, animationClass, duration = 1000) {
    const element = document.getElementById(elementId);
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

function saveProgress() {
    const progressData = {
        currentLayer,
        userData,
        restoredFragments: restoredFragments.map(f => ({
            fragment: f.fragment,
            emotion: f.emotion,
            timestamp: f.timestamp
        })),
        instabilityLevel
    };
    localStorage.setItem('anamnesisProgress', JSON.stringify(progressData));
}

function loadProgress() {
    const saved = localStorage.getItem('anamnesisProgress');
    if (saved) {
        const progressData = JSON.parse(saved);
        currentLayer = progressData.currentLayer;
        userData = progressData.userData;
        instabilityLevel = progressData.instabilityLevel;
        return true;
    }
    return false;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeMemoryForest,
        processIntake,
        generateSigil,
        runConsequenceSimulation
    };
}