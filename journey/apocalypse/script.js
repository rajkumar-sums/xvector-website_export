// ============================================
// CHECKPOINT DATA (Apocalypse)
// ============================================

const CHECKPOINT_PASSWORD = "#Apocalypse@2026";
const unlockedCheckpoints = new Set([0, 1]); // CP0 and CP1 unlocked by default
let currentCheckpointToUnlock = null;

const checkpointData = {
    0: {
        title: "Team Alignment & Curiosity",
        subtitle: "Turn 'Heat' Into Direction",
        stage: "Ignition",
        objective: "Stop early if alignment fails (learning is success).",
        tasks: [
            "Agree: Why this idea excites you",
            "Agree: Time commitment expectations",
            "Decide: Learn-first mindset (no pressure to 'startup' yet)",
            "Question: Do we want impact, profit, or learning?"
        ],
        questions: [
            "Are we okay if this doesn’t become a business?",
            "How fast can we experiment?",
            "What defines success for us right now?"
        ],
        mentors: ["Entrepreneurship fundamentals mentor"],
        successCriteria: "Alignment on expectations. If not, stop early.",
        insights: [
            "🔴 The team’s learning speed is the startup.",
            "⚠️ At this point, the idea is not the startup."
        ],
        risks: [
            "Motivation fades without quick wins (🟠 Medium)",
            "Misaligned expectations on outcome (🔴 Critical)"
        ]
    },
    1: {
        title: "Problem & Market Discovery",
        subtitle: "Find a Real Buyer Problem",
        stage: "Ignition",
        objective: "Find a real buyer problem before building tech.",
        tasks: [
            "Talk to: Textile dyers & Handloom clusters",
            "Talk to: Natural dye users",
            "Observe: Real dyeing processes on the ground",
            "Identify: Who pays vs who uses?"
        ],
        questions: [
            "What dye problems exist today?",
            "What do they hate about current dyes?",
            "What would they never compromise on?",
            "If you solve X, will they try it?"
        ],
        mentors: ["Textile industry insider", "Market discovery mentor"],
        successCriteria: "Someone says: 'If you solve X, I’ll try it.'",
        insights: [
            "💡 Natural dyes are emotionally attractive but technically unforgiving.",
            "💡 Customers don’t buy eco — they buy consistency and reliability."
        ],
        risks: [
            "Textile mills resist change (🔴 Critical)",
            "Synthetic dyes are much cheaper (🔴 Critical)"
        ]
    },
    2: {
        title: "Feasibility Exploration",
        subtitle: "Can Seed Waste Even Work?",
        stage: "Ignition",
        objective: "Prove results are repeatable at small scale.",
        tasks: [
            "Collect: 2–3 seed waste types",
            "Test: Simple extraction methods",
            "Document: Color output & Stability",
            "Analyze: Input volume required"
        ],
        questions: [
            "What colors are achievable?",
            "How repeatable are results?",
            "Can we get the same color twice?"
        ],
        mentors: ["Natural dye / chemistry expert", "University lab advisor"],
        successCriteria: "Results are repeatable at small scale.",
        insights: [
            "⚠️ Learning speed beats idea strength.",
            "⚠️ Batch variability is a major technical risk."
        ],
        risks: [
            "Color fastness issues (🔴 Critical)",
            "Batch variability (🔴 High)"
        ]
    },
    3: {
        title: "Value Hypothesis",
        subtitle: "Match Capability to Demand",
        stage: "Launchpad",
        objective: "Match capability to demand.",
        tasks: [
            "Decide: Who this is NOT for",
            "Define: 1–2 niche customers (e.g. eco-fashion brands)",
            "Determine: Is sustainability enough to justify price?"
        ],
        questions: [
            "What problem does our dye solve better?",
            "Can buyers wait longer for the process?",
            "Is the story enough to pay a premium?"
        ],
        mentors: ["Sustainable materials business expert"],
        successCriteria: "A niche customer values this over synthetics.",
        insights: [
            "💡 Don't sell to everyone. Find the niche that cares.",
            "💡 Performance must be 'good enough' for the specific use case."
        ],
        risks: [
            "Only niche artisans care (🟠 Medium)",
            "Limited color range (🔴 Medium)"
        ]
    },
    4: {
        title: "Prototype & Pilot",
        subtitle: "Real-World Dyeing Test",
        stage: "Testbed",
        objective: "Prove usage in real setting.",
        tasks: [
            "Produce: Small dye batch",
            "Test: On fabric with a partner",
            "Partner with: One artisan or brand",
            "Check: Color fastness after wash"
        ],
        questions: [
            "Does color last after wash?",
            "Is process practical for them?",
            "Would they reorder?"
        ],
        mentors: ["Textile testing expert", "Quality assurance advisor"],
        successCriteria: "Someone wants a second batch.",
        insights: [
            "⚠️ Real-world utility is the only validation.",
            "⚠️ Certification might be required sooner than you think."
        ],
        risks: [
            "Long dyeing time (🔴 High)",
            "Certification required (🟠 Medium)"
        ]
    },
    5: {
        title: "Business & Scale Logic",
        subtitle: "Decide Scale or Stay Niche",
        stage: "LiftOff", // Mapped from LiftOff (Later)
        objective: "Decide scale or stay niche.",
        tasks: [
            "Compare: Cost vs synthetic dyes",
            "Decide: Niche premium vs mass",
            "Analyze: Waste supply reliability",
            "Identify: Required certifications"
        ],
        questions: [
            "Can this scale economically?",
            "Is waste supply reliable?",
            "What are the logistics costs?"
        ],
        mentors: ["Circular economy advisor", "Supply chain expert"],
        successCriteria: "Clear decision on scaling path based on economics.",
        insights: [
            "🚀 Emotion doesn't scale, economics do.",
            "🚀 Waste availability is high, but collection is hard."
        ],
        risks: [
            "Extraction complexity (🟠 Medium)",
            "Natural dye inconsistency (🔴 High)"
        ]
    }
};

// ============================================
// CORE UI FUNCTIONS
// ============================================

function toggleCheckpoint(checkpointId) {
    if (!unlockedCheckpoints.has(checkpointId)) {
        openPasswordModal(checkpointId);
        return;
    }

    const data = checkpointData[checkpointId];
    if (!data) return;

    const drawerContent = document.getElementById('drawerContent');

    drawerContent.innerHTML = `
        <div class="drawer-header" style="margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem;">
            <h2 style="font-family: 'Outfit', sans-serif; font-size: 2rem; color: #ccff00;">CP${checkpointId}: ${data.title}</h2>
            <p style="color: #a0aec0; font-size: 1.1rem;">${data.subtitle}</p>
        </div>
        
        <div class="drawer-section" style="margin-bottom: 2rem;">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">The Mission</h4>
            <p style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 8px; border-left: 3px solid #ccff00;"><strong>${data.objective}</strong></p>
        </div>

        <div class="drawer-section" style="margin-bottom: 2rem;">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Recommended Mentors</h4>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${data.mentors.map(mentor => `<span style="background: rgba(204, 255, 0, 0.15); color: #ccff00; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; border: 1px solid rgba(204, 255, 0, 0.3);">${mentor}</span>`).join('')}
            </div>
        </div>

        <div class="drawer-section" style="margin-bottom: 2rem;">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Critical Tasks</h4>
            <ul style="list-style: none;">
                ${data.tasks.map(task => `<li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0; color: #ccff00;">⚡</span>${task}</li>`).join('')}
            </ul>
        </div>

        <div class="drawer-section" style="margin-bottom: 2rem;">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Burn Through Questions</h4>
            <ul style="list-style: none;">
                ${data.questions.map(q => `<li style="margin-bottom: 0.75rem; padding-left: 1.5rem; position: relative;"><span style="position: absolute; left: 0; color: #ff6B00;">?</span>${q}</li>`).join('')}
            </ul>
        </div>

        <div class="drawer-section" style="margin-bottom: 2rem;">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Key Weights & Risks</h4>
            <ul style="list-style: none;">
                ${data.risks.map(risk => `<li style="margin-bottom: 0.5rem; font-size: 0.9rem; color: #a0aec0;">${risk}</li>`).join('')}
            </ul>
        </div>

        <div class="drawer-section" style="margin-top: 3rem; background:rgba(204, 255, 0, 0.05); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(204, 255, 0, 0.1);">
            <h4 style="color: #ccff00; margin-bottom: 0.5rem;">➡️ Move to CP${checkpointId + 1} Only If:</h4>
            <p style="font-weight: 600;">${data.successCriteria}</p>
        </div>
    `;

    openDrawer();
}

function openDrawer() {
    document.getElementById('drawer').classList.add('active');
    document.getElementById('drawerOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    document.getElementById('drawer').classList.remove('active');
    document.getElementById('drawerOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// PASSWORD MODAL
// ============================================

function openPasswordModal(checkpointId) {
    currentCheckpointToUnlock = checkpointId;
    document.getElementById('unlockCheckpointNumber').textContent = checkpointId;
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('passwordModalOverlay').classList.add('active');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').style.display = 'none';
    setTimeout(() => document.getElementById('passwordInput').focus(), 100);
}

function closePasswordModal() {
    document.getElementById('passwordModal').classList.remove('active');
    document.getElementById('passwordModalOverlay').classList.remove('active');
    currentCheckpointToUnlock = null;
}

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');

    if (input.value === CHECKPOINT_PASSWORD) {
        unlockedCheckpoints.add(currentCheckpointToUnlock);
        updateCheckpointUI(currentCheckpointToUnlock);
        closePasswordModal();
        setTimeout(() => toggleCheckpoint(currentCheckpointToUnlock), 300);
    } else {
        error.style.display = 'block';
        input.value = '';
        input.focus();
    }
}

function updateCheckpointUI(checkpointId) {
    const cp = document.querySelector(`[data-checkpoint="${checkpointId}"]`);
    if (!cp) return;

    cp.classList.remove('locked');
    const marker = cp.querySelector('.marker-number');
    marker.innerHTML = String(checkpointId).padStart(2, '0');

    const badge = cp.querySelector('.locked-badge');
    if (badge) {
        badge.classList.remove('locked-badge');
        badge.textContent = badge.textContent.replace('🔒 ', '');
    }
}

// Handle Enter key for password
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.getElementById('passwordModal').classList.contains('active')) {
        checkPassword();
    }
    if (e.key === 'Escape') {
        closePasswordModal();
        closeDrawer();
    }
});
