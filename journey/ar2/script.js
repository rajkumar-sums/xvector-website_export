// ============================================
// CHECKPOINT DATA (AR2)
// ============================================

const CHECKPOINT_PASSWORD = "#AR2@2026";
const unlockedCheckpoints = new Set([0, 1]); // CP0 and CP1 unlocked by default
let currentCheckpointToUnlock = null;

const checkpointData = {
    0: {
        title: "Founder & Concept Alignment",
        subtitle: "Stop Concept Ambiguity",
        stage: "Ignition",
        objective: "Stop ambiguity before testing.",
        tasks: [
            "Decide: Age group (e.g. 3–6 or 6–10)",
            "Decide: Snack format (bars, bites, powder, mix)",
            "Decide: Occasion (school snack / travel / daily)",
            "Define: ONE hero product only"
        ],
        questions: [
            "Who exactly is buying — mother, father, school?",
            "What problem does this replace today?",
            "Why will parents trust you?"
        ],
        mentors: ["Early-stage startup mentor", "FMCG category advisor"],
        successCriteria: "Concept Definition agreed upon. No moving forward without clarity.",
        insights: [
            "🔴 This idea has heart, but zero system right now.",
            "⚠️ Taste alone is not enough — trust, safety, and convenience matter more."
        ],
        risks: [
            "Food & Trust Risks (🔴 Critical)",
            "Inconsistent taste (🔴 High)"
        ]
    },
    1: {
        title: "Problem & Buyer Validation",
        subtitle: "Parent Interviews (Not Kids)",
        stage: "Ignition",
        objective: "Validate demand before scaling effort.",
        tasks: [
            "25–30 interviews with parents",
            "Observe: What snacks they pack & Monthly snack spend",
            "Show product samples",
            "Identify: What scares them about homemade food?"
        ],
        questions: [
            "What do you give your child daily?",
            "What do you avoid giving them?",
            "Would you replace current snack with this?",
            "What price feels acceptable per pack?"
        ],
        mentors: ["Customer discovery mentor", "Parenting / nutrition market expert"],
        successCriteria: "At least 30–40% parents show repeat-buy intent.",
        insights: [
            "💡 Validate parent anxiety is real.",
            "💡 Verify daily consumption potential."
        ],
        risks: [
            "Too expensive for kids snacks (🔴 High)",
            "Kids reject after 2–3 tries (🟠 Medium)"
        ]
    },
    2: {
        title: "Safety, Nutrition & Compliance",
        subtitle: "Build Trust Before Brand",
        stage: "Launchpad",
        objective: "Build trust before brand - Non-negotiable.",
        tasks: [
            "Start: Local food safety license & Basic hygiene SOP",
            "Consult: Nutritionist for formulation",
            "Define: Nutritional claims (what you will NOT say)",
            "Define: Allergens & Mandatory certifications"
        ],
        questions: [
            "What nutrients are actually delivered?",
            "What is the shelf life?",
            "What allergens exist?",
            "What certifications are mandatory?"
        ],
        mentors: ["Food safety & compliance expert", "Child nutritionist / dietician"],
        successCriteria: "Compliance groundwork complete. No scaling without this.",
        insights: [
            "⚠️ Founder Truth: Safety beats speed.",
            "⚠️ No branding or exports before compliance."
        ],
        risks: [
            "Food safety non-compliance (🔴 Critical)",
            "Parental trust loss (🔴 Critical)"
        ]
    },
    3: {
        title: "Test Product (Micro Testbed)",
        subtitle: "Turn Liking Into Data",
        stage: "Launchpad",
        objective: "Turn liking into data with a small batch test.",
        tasks: [
            "Produce: Small standardized batches",
            "Define metrics: Cost per unit & Repeat purchase",
            "Sell to: 10–20 families over 30 days",
            "Track: Taste consistency & Emerging complaints"
        ],
        questions: [
            "Do parents reorder?",
            "Do kids finish the pack?",
            "Does taste consistency hold?",
            "Are complaints emerging?"
        ],
        mentors: ["Food product development expert", "Small-batch operations advisor"],
        successCriteria: "Repeat purchase >25–30%.",
        insights: [
            "💡 In kids’ food, trust beats innovation.",
            "💡 Handmade limits volume - check consistency."
        ],
        risks: [
            "Shelf-life issues (🔴 High)",
            "Parents revert to cheap snacks (🔴 High)"
        ]
    },
    4: {
        title: "Community Production Model",
        subtitle: "Systemize the Community",
        stage: "Testbed",
        objective: "Make housewife model viable and scalable.",
        tasks: [
            "Create: Training SOP & Quality checklist",
            "Establish: Central sourcing of raw materials",
            "Decide: Central kitchen vs distributed prep",
            "Define: Failure handling & rejection protocols"
        ],
        questions: [
            "Can quality be replicated?",
            "Who rejects bad batches?",
            "What is the failure handling process?"
        ],
        mentors: ["Social enterprise / livelihood model expert", "Quality control advisor"],
        successCriteria: "Quality variance is controllable.",
        insights: [
            "🏗️ Consistency beats creativity.",
            "🏗️ Community model lacks SOP - needs systemization."
        ],
        risks: [
            "Quality varies by maker (🔴 High)",
            "Community model lacks SOP (🔴 High)"
        ]
    },
    5: {
        title: "Brand, Scale & Export Readiness",
        subtitle: "Earn the Right to Think Global",
        stage: "LiftOff",
        objective: "Earn the right to think global.",
        tasks: [
            "Define: Brand positioning (not “healthy only”)",
            "Design: Packaging for shelf & export",
            "Validate: Domestic traction first",
            "Research: International regulation"
        ],
        questions: [
            "Do parents trust this brand?",
            "Is domestic demand strong?",
            "What international regulation applies?"
        ],
        mentors: ["FMCG brand builder", "Export & food regulation expert"],
        successCriteria: "Proven domestic traction. No international sales without it.",
        insights: [
            "🚀 Scale Logic: Domestic proof first.",
            "🚀 International ambition without domestic proof is a gap."
        ],
        risks: [
            "International ambition distraction (🔴 Critical)",
            "Handmade limits volume (🔴 Critical)"
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
