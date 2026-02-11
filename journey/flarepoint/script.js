// ============================================
// CHECKPOINT DATA (FLAREPOINT)
// ============================================

const CHECKPOINT_PASSWORD = "#Flare@2026";
const unlockedCheckpoints = new Set([0, 1]); // CP0 and CP1 unlocked by default
let currentCheckpointToUnlock = null;

const checkpointData = {
    0: {
        title: "Founder Alignment",
        subtitle: "Stop Building Fantasies",
        stage: "Ignition",
        objective: "Stop building fantasies and align on one single problem to test.",
        tasks: [
            "Decide: B2B only (hotels, restaurants)?",
            "Segment: Small restaurants or mid hotels?",
            "Kill: All 3-year projections (for now)",
            "Align: One single problem statement to test"
        ],
        questions: [
            "Who EXACTLY pays for this?",
            "Who uses it daily?",
            "Who blocks the purchase?",
            "What happens if this fails during dinner rush?"
        ],
        mentors: ["Startup fundamentals mentor"],
        successCriteria: "One single problem to test is agreed upon by all founders.",
        insights: [
            "🔴 This team is currently solution-heavy, problem-light.",
            "⚠️ You do NOT move forward without internal clarity."
        ],
        risks: [
            "Macro problems are not yet felt pains (🔴 High)",
            "Founder attachment to a solution that might not solve a real pain (🔴 High)"
        ]
    },
    1: {
        title: "Problem Discovery",
        subtitle: "Kitchen Shadowing & Interviews",
        stage: "Ignition",
        objective: "Validate pain before building any hardware.",
        tasks: [
            "25–30 interviews with Chefs, Kitchen Managers, and Hotel Owners",
            "Kitchen shadowing: Observe the flow, not just the equipment",
            "Document downtime frequency and costs",
            "Compare gas vs. electricity reliability perceptions"
        ],
        questions: [
            "What is their biggest kitchen fear?",
            "How often do gas-related issues occur?",
            "What was the last real accident?",
            "What would make them switch from gas?"
        ],
        mentors: ["Customer discovery mentor", "Hospitality industry insider"],
        successCriteria: "At least 30–40% express active dissatisfaction with gas.",
        insights: [
            "💡 Chefs buy because it doesn't slow service — not just for safety.",
            "💡 Observe behavior, don't just ask for opinions."
        ],
        risks: [
            "Chefs resist changing cooking method (🔴 Critical)",
            "Electricity trust issues (🔴 High)"
        ]
    },
    2: {
        title: "Value Hypothesis",
        subtitle: "Safety vs Cost vs Speed",
        stage: "Launchpad",
        objective: "Define exactly why Flare matters to the buyer and the user.",
        tasks: [
            "Test 3 value propositions: Safety-first, Cost-saving, Speed/Control",
            "Use sketches and concept drawings, not real devices",
            "A/B test the messaging with different segments"
        ],
        questions: [
            "Which value excites them most?",
            "What scares them about electric cooking?",
            "What would be a absolute deal-breaker?",
            "Would they be willing to pilot it if safety was proven?"
        ],
        mentors: ["B2B value proposition expert"],
        successCriteria: "One value proposition clearly dominates in resonance.",
        insights: [
            "💡 Reliability under pressure is the ultimate value.",
            "⚠️ Taste and heat control are non-negotiable."
        ],
        risks: [
            "Chef's 'Gas is faster' belief (🔴 High)",
            "Economic assumptions built before demand validation (🟠 Medium)"
        ]
    },
    3: {
        title: "Concept Validation",
        subtitle: "Fake Prototype Test",
        stage: "Launchpad",
        objective: "Test switching willingness without building full machinery.",
        tasks: [
            "Create a high-quality video demo of the plasma arc power",
            "Show a mock kitchen setup",
            "Calculate potential savings for specific customer sized"
        ],
        questions: [
            "Would they replace ONE stove to start?",
            "What conditions must be met for a pilot?",
            "Who must approve the purchase internally?",
            "What price feels too risky for a first unit?"
        ],
        mentors: ["B2B sales mentor", "Industrial product advisor"],
        successCriteria: "At least 5 customers commit (LOI) to a pilot test.",
        insights: [
            "💡 Getting a pilot commitment is much harder than a 'good idea' comment.",
            "💡 Identify the internal 'blockers' early."
        ],
        risks: [
            "Maintenance complexity fears (🔴 High)",
            "Cultural cooking habits (🔴 High)"
        ]
    },
    4: {
        title: "Prototype & Safety Proof",
        subtitle: "Don't Kill Trust",
        stage: "Testbed",
        objective: "Prove the tech works in a real high-stress environment.",
        tasks: [
            "Build 1–2 working plasma units",
            "Install in one highly cooperative kitchen",
            "Shadow the chef during every single peak hour for 2 weeks",
            "Track up-time, cleaning time, and throughput"
        ],
        questions: [
            "Does cooking quality match gas exactly?",
            "Any hesitation or frustration during rush hours?",
            "Any technical failure or plasma instability?",
            "Would they pay for this unit now?"
        ],
        mentors: ["Electrical safety expert", "Hardware testing engineer"],
        successCriteria: "Zero technical failures during peak hours for 30 days.",
        insights: [
            "💡 Peer recommendation from the pilot chef is your only real sales tool.",
            "⚠️ Safety isn't a feature, it's the price of entry."
        ],
        risks: [
            "Plasma tech reliability issues (🔴 Critical)",
            "Local servicing difficulties (🔴 High)"
        ]
    },
    5: {
        title: "Business Model Reality",
        subtitle: "Money & Scale",
        stage: "Testbed",
        objective: "Align the business model with the customer's cash flow.",
        tasks: [
            "Test Device Sale vs. Lease/Subscription",
            "Calculate real AMC (Annual Maintenance Contract) costs",
            "Validate local servicing/repair speed",
            "Establish installer training SOPs"
        ],
        questions: [
            "Is the upfront cost a barrier?",
            "Would they prefer an 'Energy as a Service' model?",
            "Who handles maintenance at 2 AM?",
            "How fast can we replace a unit if it fails?"
        ],
        mentors: ["Industrial pricing expert", "Operations advisor"],
        successCriteria: "Repeatable pricing model that achieves <18 month payback.",
        insights: [
            "🏗️ Scaling hardware requires a service network, not just a factory.",
            "🏗️ Subscription models lower the switching risk for hotels."
        ],
        risks: [
            "Installation quality at scale (🔴 High)",
            "Warranty liability (🟠 Medium)"
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
