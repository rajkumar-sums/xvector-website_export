// ============================================
// CHECKPOINT DATA
// ============================================

// Password configuration
const CHECKPOINT_PASSWORD = "#HorizonFury@2026"; // Password for locked checkpoints
const unlockedCheckpoints = new Set([1]); // Only checkpoint 1 is unlocked by default
let currentCheckpointToUnlock = null;

const checkpointData = {
    1: {
        title: "Problem Validation",
        subtitle: "Ground Truth Discovery",
        stage: "Launchpad",
        objective: "Confirm people care enough to change behavior",
        tasks: [
            "Conduct 20–30 in-home interviews",
            "Observe: Do people leave lights/fans on? Who pays the electricity bill?",
            "Ask users to show last 3 electricity bills",
            "Document actual behavior patterns vs. claimed behavior"
        ],
        questions: [
            "Do users admit energy waste?",
            "Do they feel guilty, annoyed, or indifferent?",
            "What monthly saving would excite them?",
            "Who decides to buy home devices?",
            "What scares them about smart devices?"
        ],
        mentors: [
            "Customer discovery mentor",
            "Energy sector practitioner (local)"
        ],
        successCriteria: "Users acknowledge waste AND show interest in automation",
        insights: [
            "🔴 This is a real problem, but a low emotional pain problem",
            "💡 Energy waste hurts bills & environment, not immediate comfort",
            "⚠️ Education + trust matter as much as technology"
        ],
        risks: [
            "Users don't feel urgency (🔴 High)",
            "'Manual switch is enough' mindset (🔴 High)",
            "Price sensitivity (🔴 High)"
        ]
    },
    2: {
        title: "Solution Definition",
        subtitle: "MVP Design (Not Final Product)",
        stage: "Late Launchpad",
        objective: "Convert idea into a testable product",
        tasks: [
            "Decide: Sensors only or sensor + app?",
            "Decide: Fully automatic or user override?",
            "Design one-room MVP (lights + fan only)",
            "Create paper prototype + wiring diagram",
            "Define installation process"
        ],
        questions: [
            "What is the minimum useful automation?",
            "What must never auto-turn off?",
            "What happens during power cuts?",
            "Can it work without internet?",
            "How do users override the system?"
        ],
        mentors: [
            "IoT / embedded systems expert",
            "Electrical safety advisor"
        ],
        successCriteria: "You can explain the system simply to a non-tech parent",
        insights: [
            "⚠️ Hardware reliability is CRITICAL",
            "⚠️ False shut-offs (AC/lights) = user trust death",
            "⚠️ Sensor accuracy must be validated early"
        ],
        risks: [
            "Hardware reliability (🔴 Critical)",
            "False shut-offs causing user frustration (🔴 Critical)",
            "Power fluctuation handling (🔴 Critical)"
        ]
    },
    3: {
        title: "Prototype & Safety Test",
        subtitle: "Controlled Home Pilots",
        stage: "Early Testbed",
        objective: "Make it work in 3–5 real homes",
        tasks: [
            "Build 3–5 working prototypes",
            "Install in one family home",
            "Install in one rented flat",
            "Monitor continuously for 30 days",
            "Collect daily feedback from users",
            "Track energy savings with real data"
        ],
        questions: [
            "Does it ever shut off incorrectly?",
            "Do users override automation frequently?",
            "Are energy savings visible and meaningful?",
            "Do users complain more than praise?",
            "What breaks or malfunctions during normal use?"
        ],
        mentors: [
            "Hardware testing expert",
            "Residential electrician (local)",
            "Quality assurance specialist"
        ],
        successCriteria: "Zero safety incidents & high user tolerance",
        insights: [
            "🏠 Real homes reveal problems labs can't",
            "⚡ Installation friction is a major barrier",
            "👥 Different family types have different needs"
        ],
        risks: [
            "Safety incidents destroying credibility (🔴 Critical)",
            "Installation complexity scaring users (🔴 High)",
            "Landlord permission issues (🟠 Medium)"
        ]
    },
    4: {
        title: "Value & Pricing Validation",
        subtitle: "Economics Reality",
        stage: "Testbed",
        objective: "See if savings justify price",
        tasks: [
            "Calculate actual monthly energy saved (not theoretical)",
            "Determine payback period based on real data",
            "Test one-time device cost perception",
            "Explore EMI or subscription models",
            "Survey willingness to pay at different price points"
        ],
        questions: [
            "How long until user 'breaks even'?",
            "Is installation friction acceptable for the savings?",
            "Would they recommend it to friends/family?",
            "What price feels 'too expensive'?",
            "Would they prefer to buy or subscribe?"
        ],
        mentors: [
            "Energy economics expert",
            "Pricing strategist",
            "Consumer behavior specialist"
        ],
        successCriteria: "Payback ≤ 18–24 months feels acceptable to users",
        insights: [
            "💰 Delayed benefit = harder sell than instant gratification",
            "📊 Visible savings dashboard increases perceived value",
            "🎯 Different user segments have different willingness to pay"
        ],
        risks: [
            "Payback period too long (🔴 High)",
            "Price sensitivity in residential market (🔴 High)",
            "Savings not visible or compelling enough (🟠 Medium)"
        ]
    },
    5: {
        title: "Trust & Scale Readiness",
        subtitle: "Scale Foundations",
        stage: "LiftOff",
        objective: "Prepare for wider residential rollout",
        tasks: [
            "Define installation SOP (Standard Operating Procedure)",
            "Create maintenance and support plan",
            "Obtain safety certification",
            "Establish clear warranty terms",
            "Build installer training program",
            "Set up customer support infrastructure"
        ],
        questions: [
            "Can installers be trained quickly and reliably?",
            "What breaks at 10× installations?",
            "Who handles failures and customer complaints?",
            "How do we maintain quality at scale?",
            "What legal/compliance requirements exist?"
        ],
        mentors: [
            "Operations scaling advisor",
            "Legal / compliance advisor",
            "Customer success expert"
        ],
        successCriteria: "Repeatable installation process + trust infrastructure in place",
        insights: [
            "🏗️ Hardware startups must win on trust, safety, and simplicity",
            "📈 Scaling hardware is fundamentally different from software",
            "⚖️ Compliance and certification are non-negotiable"
        ],
        risks: [
            "Installation quality degrading at scale (🔴 High)",
            "Support infrastructure not ready (🟠 Medium)",
            "Certification delays (🟠 Medium)"
        ]
    }
};

// ============================================
// ADDITIONAL CONTEXT DATA
// ============================================
const contextData = {
    problemAnalysis: {
        title: "Problem Strength Assessment",
        dimensions: [
            { dimension: "Problem exists", status: "✅ Yes" },
            { dimension: "Happens frequently", status: "✅ Daily" },
            { dimension: "User feels pain", status: "⚠️ Weak" },
            { dimension: "User is actively seeking solution", status: "❌ Mostly no" },
            { dimension: "User willing to pay", status: "❓ Unproven" }
        ],
        keyInsight: "This is a REAL problem, but a LOW EMOTIONAL PAIN problem. Energy waste hurts bills & environment, not immediate comfort."
    },
    currentPosition: {
        stage: "LAUNCHPAD",
        score: "13/30",
        reasons: [
            "Idea & concept exist",
            "Problem identified",
            "No real-world validation",
            "No working prototype tested in homes"
        ],
        nextGoal: "Move from Launchpad → Testbed"
    },
    vsComparison: {
        title: "Urjaghar vs LYT (Software App)",
        differences: [
            { aspect: "Nature", lyt: "Emotion-driven", urjaghar: "Logic + trust-driven" },
            { aspect: "Gratification", lyt: "Instant", urjaghar: "Delayed benefit" },
            { aspect: "Platform", lyt: "App-first", urjaghar: "Hardware-first" },
            { aspect: "Trial barrier", lyt: "Easy trial", urjaghar: "Hard to uninstall" }
        ],
        winningFactors: "Trust, safety, savings clarity, and simplicity"
    }
};

// ============================================
// DRAWER FUNCTIONS
// ============================================
function toggleCheckpoint(checkpointId) {
    // Check if checkpoint is locked
    if (!unlockedCheckpoints.has(checkpointId)) {
        openPasswordModal(checkpointId);
        return;
    }

    const data = checkpointData[checkpointId];
    if (!data) return;

    const drawerContent = document.getElementById('drawerContent');

    // Build drawer HTML
    drawerContent.innerHTML = `
        <div class="drawer-header">
            <h2 class="drawer-title">Checkpoint ${checkpointId}: ${data.title}</h2>
            <p class="drawer-subtitle">${data.subtitle}</p>
        </div>
        
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L12 8L18 8L13 12L15 18L10 14L5 18L7 12L2 8L8 8L10 2Z" fill="currentColor"/>
                </svg>
                Objective
            </div>
            <div class="section-content">
                <p><strong>${data.objective}</strong></p>
            </div>
        </div>
        
        ${data.insights ? `
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M10 6V10L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Key Insights
            </div>
            <div class="section-content">
                <ul class="task-list">
                    ${data.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}
        
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Tasks
            </div>
            <div class="section-content">
                <ul class="task-list">
                    ${data.tasks.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                    <path d="M10 7V10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="10" cy="13" r="0.5" fill="currentColor"/>
                </svg>
                Critical Questions to Answer
            </div>
            <div class="section-content">
                <ul class="question-list">
                    ${data.questions.map(q => `<li>${q}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        ${data.risks ? `
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L2 18H18L10 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M10 8V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="10" cy="15" r="0.5" fill="currentColor"/>
                </svg>
                Key Risks
            </div>
            <div class="section-content">
                <ul class="task-list">
                    ${data.risks.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}
        
        <div class="drawer-section">
            <div class="section-title">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10C4 10 6 6 10 6C14 6 16 10 16 10C16 10 14 14 10 14C6 14 4 10 4 10Z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="2"/>
                </svg>
                Mentors Needed
            </div>
            <div class="section-content">
                <div class="mentor-tags">
                    ${data.mentors.map(mentor => `<span class="mentor-tag">${mentor}</span>`).join('')}
                </div>
            </div>
        </div>
        
        <div class="success-criteria">
            <h4>✓ Move Forward Only If:</h4>
            <p>${data.successCriteria}</p>
        </div>
    `;

    // Open drawer
    openDrawer();
}

function openDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');

    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const overlay = document.getElementById('drawerOverlay');

    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// PIPELINE NAVIGATION
// ============================================
const stageInfo = {
    ignition: {
        name: "Ignition",
        description: "Idea validation and initial concept development"
    },
    launchpad: {
        name: "Launchpad",
        description: "Problem validation and MVP design - Current Stage"
    },
    testbed: {
        name: "Testbed",
        description: "Prototype testing and market validation"
    },
    liftoff: {
        name: "LiftOff",
        description: "Scale preparation and trust building"
    },
    orbit: {
        name: "Orbit",
        description: "Growth and market expansion"
    }
};

// Add tooltips to pipeline stages
document.addEventListener('DOMContentLoaded', function () {
    const stages = document.querySelectorAll('.stage');

    stages.forEach(stage => {
        const stageName = stage.getAttribute('data-stage');
        const info = stageInfo[stageName];

        if (info) {
            stage.setAttribute('title', info.description);

            stage.addEventListener('click', function () {
                if (!this.classList.contains('active')) {
                    showStageInfo(stageName, info);
                }
            });
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDrawer();
        }
    });

    // Smooth scroll reveal
    observeCheckpoints();
});

function showStageInfo(stageName, info) {
    // You could implement a tooltip or modal here
    console.log(`Stage: ${info.name} - ${info.description}`);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function observeCheckpoints() {
    const checkpoints = document.querySelectorAll('.checkpoint');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    checkpoints.forEach(checkpoint => {
        observer.observe(checkpoint);
    });
}

// ============================================
// PASSWORD MODAL FUNCTIONS
// ============================================
function openPasswordModal(checkpointId) {
    currentCheckpointToUnlock = checkpointId;
    const modal = document.getElementById('passwordModal');
    const overlay = document.getElementById('passwordModalOverlay');
    const checkpointNumber = document.getElementById('unlockCheckpointNumber');
    const passwordInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('passwordError');

    checkpointNumber.textContent = checkpointId;
    passwordInput.value = '';
    errorMsg.classList.remove('show');

    modal.classList.add('active');
    overlay.classList.add('active');

    // Focus on input after animation
    setTimeout(() => {
        passwordInput.focus();
    }, 300);

    // Add enter key listener
    // Clear old listener if necessary, or just use a fresh one
    const newPasswordInput = passwordInput.cloneNode(true);
    passwordInput.parentNode.replaceChild(newPasswordInput, passwordInput);

    newPasswordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
}

function closePasswordModal() {
    const modal = document.getElementById('passwordModal');
    const overlay = document.getElementById('passwordModalOverlay');
    const errorMsg = document.getElementById('passwordError');

    modal.classList.remove('active');
    overlay.classList.remove('active');
    errorMsg.classList.remove('show');
    currentCheckpointToUnlock = null;
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMsg = document.getElementById('passwordError');
    const enteredPassword = passwordInput.value;

    if (enteredPassword === CHECKPOINT_PASSWORD) {
        // Correct password - unlock checkpoint
        unlockedCheckpoints.add(currentCheckpointToUnlock);

        // Update UI to show unlocked state
        const checkpoint = document.querySelector(`[data-checkpoint="${currentCheckpointToUnlock}"]`);
        if (checkpoint) {
            checkpoint.classList.remove('locked');

            // Replace lock icon with checkpoint number
            const markerNumber = checkpoint.querySelector('.marker-number');
            if (markerNumber) {
                markerNumber.innerHTML = String(currentCheckpointToUnlock).padStart(2, '0');
            }

            // Remove locked badge
            const badge = checkpoint.querySelector('.locked-badge');
            if (badge) {
                badge.classList.remove('locked-badge');
                badge.textContent = badge.textContent.replace('🔒 ', '');
            }

            // Make card interactive again
            const card = checkpoint.querySelector('.checkpoint-card');
            if (card) {
                card.style.cursor = 'pointer';
                card.style.opacity = '1';
            }
        }

        // Close modal
        closePasswordModal();

        // Show success animation
        setTimeout(() => {
            toggleCheckpoint(currentCheckpointToUnlock);
        }, 300);

    } else {
        // Incorrect password - show error
        errorMsg.classList.add('show');
        passwordInput.value = '';
        passwordInput.focus();

        // Shake animation
        const modal = document.getElementById('passwordModal');
        modal.style.animation = 'shake 0.5s';
        setTimeout(() => {
            modal.style.animation = '';
        }, 500);
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) translateX(0); }
        25% { transform: translate(-50%, -50%) translateX(-10px); }
        75% { transform: translate(-50%, -50%) translateX(10px); }
    }
`;
document.head.appendChild(style);

// ============================================
// UTILITY FUNCTIONS
// ============================================
function scrollToCheckpoint(checkpointId) {
    const checkpoint = document.querySelector(`[data-checkpoint="${checkpointId}"]`);
    if (checkpoint) {
        checkpoint.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Export for external use
window.urjagharJourney = {
    checkpointData,
    contextData,
    toggleCheckpoint,
    openDrawer,
    closeDrawer,
    scrollToCheckpoint
};
