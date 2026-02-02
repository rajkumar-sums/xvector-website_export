const contentData = {
    "need-analysis": {
        title: "Problem Validation",
        subtitle: "Reality Check & Market Fit",
        content: `
            <div class="detail-section">
                <h4>Problem Strength Assessment</h4>
                <div class="info-item">
                    <span class="info-label">Key Insight</span>
                    <div class="info-value">
                        This is a REAL problem, but a LOW EMOTIONAL PAIN problem. Energy waste hurts bills & environment, not immediate comfort.
                    </div>
                </div>
                <br>
                <div class="detail-grid">
                    <div class="info-item">
                        <span class="info-label">Problem exists</span>
                        <div class="info-value">✅ Yes</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Happens frequently</span>
                        <div class="info-value">✅ Daily</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">User feels pain</span>
                        <div class="info-value">⚠️ Weak</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Seeking solution</span>
                        <div class="info-value">❌ Mostly no</div>
                    </div>
                </div>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                    <h4>Ground Truth Discovery</h4>
                    <p>Users must acknowledge waste <strong>and</strong> show interest in automation.</p>
                    <ul style="margin-top: 10px;">
                        <li>Conduct 20–30 in-home interviews</li>
                        <li>Observe: Do people leave lights/fans on?</li>
                        <li>Ask users to show last 3 electricity bills</li>
                    </ul>
                </div>

                <div class="detail-section">
                    <h4>Success Criteria</h4>
                    <p style="color: var(--color-primary);">✓ Users acknowledge waste AND show interest in automation</p>
                </div>
            </div>
        `
    },
    "positioning": {
        title: "Stage Positioning",
        subtitle: "Current Status",
        content: `
            <div class="detail-section">
                <h4 style="font-size: 32px; color: var(--color-primary);">🚦 LAUNCHPAD</h4>
                <p><strong>Current Score: 13/30</strong></p>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                    <h4>Why Launchpad?</h4>
                    <ul class="q-list">
                        <li>Idea & concept exist</li>
                        <li>Problem identified</li>
                        <li>No real-world validation yet</li>
                        <li>No working prototype tested in homes</li>
                    </ul>
                </div>
                <div class="detail-section">
                    <h4>Next Goal</h4>
                    <p style="color: var(--color-primary);">Move from Launchpad → Testbed</p>
                </div>
            </div>
        `
    },
    "risks": {
        title: "Risk Analysis",
        subtitle: "Critical Evaluation",
        content: `
            <div class="detail-section">
                <h4>Hardware & Reliability Risks</h4>
                <div class="risk-table-row">
                    <span class="risk-name">Hardware reliability</span>
                    <span class="risk-badge risk-critical">Critical</span>
                </div>
                <div class="risk-table-row">
                    <span class="risk-name">False shut-offs</span>
                    <span class="risk-badge risk-critical">Critical</span>
                </div>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                     <div class="risk-table-row">
                        <span class="risk-name">Safety incidents</span>
                        <span class="risk-badge risk-critical">Critical</span>
                    </div>
                    <div class="risk-table-row">
                        <span class="risk-name">Price sensitivity</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Market Risks</h4>
                    <div class="risk-table-row">
                        <span class="risk-name">Users don't feel urgency</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                    <div class="risk-table-row">
                        <span class="risk-name">'Manual switch is enough' mindset</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                </div>
            </div>
        `
    },
    "roadmap": {
        title: "Linear Journey",
        subtitle: "5 Checkpoints to LIFT-OFF Success",
        content: `
            <div class="roadmap-accordion">
                <!-- Checkpoint 1 -->
                <div class="checkpoint-card active" onclick="toggleCheckpoint(this)">
                    <div class="checkpoint-header">
                        <div class="checkpoint-title-group">
                            <h5>STOP 1</h5>
                            <h3>Problem Validation</h3>
                        </div>
                        <div class="checkpoint-status">+</div>
                    </div>
                    <div class="checkpoint-body">
                        <p class="mb-4"><strong>Objective:</strong> Confirm people care enough to change behavior</p>
                        <div class="q-category">
                            <div class="q-cat-title">Tasks</div>
                            <ul class="q-list">
                                <li>Conduct 20–30 in-home interviews</li>
                                <li>Observe: Do people leave lights/fans on?</li>
                                <li>Document behavior patterns vs. claimed behavior</li>
                            </ul>
                        </div>
                        <div class="go-no-go success">
                            <span class="decision-icon">✓</span>
                            <div class="decision-content">
                                <strong>Success Criteria</strong>
                                <p>Users acknowledge waste AND show interest in automation</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="restricted-content">
                    <!-- Checkpoint 2 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                        <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 2</h5>
                                <h3>Solution Definition</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                        <div class="checkpoint-body">
                            <p class="mb-4"><strong>Objective:</strong> Convert idea into a testable product (MVP)</p>
                            <div class="q-category">
                                <ul class="q-list">
                                    <li>Decide: Sensors only or sensor + app?</li>
                                    <li>Design one-room MVP (lights + fan only)</li>
                                    <li>Define installation process</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Checkpoint 3 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                        <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 3</h5>
                                <h3>Prototype & Safety Test</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                        <div class="checkpoint-body">
                            <p class="mb-4"><strong>Objective:</strong> Make it work in 3–5 real homes</p>
                            <div class="q-category">
                                <ul class="q-list">
                                    <li>Build 3–5 working prototypes</li>
                                    <li>Install in family homes & rented flats</li>
                                    <li>Monitor continuously for 30 days</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Checkpoint 4 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                        <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 4</h5>
                                <h3>Value & Pricing Validation</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                        <div class="checkpoint-body">
                            <p class="mb-4"><strong>Objective:</strong> See if savings justify price</p>
                            <div class="q-category">
                                <ul class="q-list">
                                    <li>Calculate actual monthly energy saved</li>
                                    <li>Determine payback period (Goal: ≤ 18–24 months)</li>
                                    <li>Test price points & EMI models</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Checkpoint 5 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                        <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 5</h5>
                                <h3>Trust & Scale Readiness</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                        <div class="checkpoint-body">
                            <p class="mb-4"><strong>Objective:</strong> Prepare for wider residential rollout</p>
                            <div class="q-category">
                                <ul class="q-list">
                                    <li>Define installation SOP & safety certification</li>
                                    <li>Establish warranty & support infrastructure</li>
                                    <li>Build installer training program</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "comparison": {
        title: "Urjaghar vs LYT",
        subtitle: "Hardware vs Software",
        content: `
            <div class="detail-section">
                <div class="detail-grid">
                    <div class="info-item">
                        <span class="info-label">Nature</span>
                        <div class="info-value">Logic + Trust-driven</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Gratification</span>
                        <div class="info-value">Delayed benefit</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Platform</span>
                        <div class="info-value">Hardware-first</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Trial barrier</span>
                        <div class="info-value">Hard to uninstall</div>
                    </div>
                </div>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                    <h4>Winning Factors</h4>
                    <p>Trust, safety, savings clarity, and simplicity.</p>
                </div>
            </div>
        `
    },
    "final-truth": {
        title: "Final Truth",
        subtitle: "Founder Note",
        content: `
            <div class="detail-section">
                <div class="info-item" style="border: 1px solid var(--color-primary); background: rgba(0,255,136,0.05);">
                    <h4 style="margin-top:0;">Not Just another Device</h4>
                    <p>This is a trust + reliability + safety venture.</p>
                </div>
            </div>
            
            <div class="restricted-content">
                <div class="detail-section">
                    <br>
                    <p><strong>Reliability is your weapon.</strong></p>
                    <p><strong>Safety is your defense.</strong></p>
                    <p><strong>Trust is your brand.</strong></p>
                </div>
            </div>
        `
    }
};

const initJourney = () => {
    console.log("Journey Script Initializing...");
    const nodes = document.querySelectorAll('.journey-node');
    const drawer = document.getElementById('info-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closeBtn = document.getElementById('drawer-close');
    const drawerContent = document.getElementById('drawer-content');

    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const lockBox = document.querySelector('.lock-box');
    let isJourneyUnlocked = false;

    if (!nodes.length) {
        console.warn("No journey nodes found during initialization.");
    } else {
        console.log("Nodes found:", nodes.length);
    }

    // Use Horizon Fury password
    const CHECKPOINT_PASSWORD = "#HorizonFury@2026";

    function openDrawer(id) {
        console.log("Opening drawer for:", id);
        const data = contentData[id];
        if (!data) {
            console.error("No data found for ID:", id);
            return;
        }

        // Populate Content
        drawerContent.innerHTML = `
            <h2 class="detail-title">${data.title}</h2>
            <h3 style="color: grey; margin-bottom: 30px;">${data.subtitle}</h3>
            <div class="detail-body">${data.content}</div>
        `;

        // Handle Lock State
        if (!isJourneyUnlocked) {
            drawer.classList.add('locked');
            if (passwordInput) passwordInput.value = ''; // Reset input
            setTimeout(() => { if (passwordInput) passwordInput.focus(); }, 500); // Focus for smooth typing
        } else {
            drawer.classList.remove('locked');
        }

        // Show
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function attemptUnlock() {
        const input = passwordInput ? passwordInput.value : '';
        if (input === CHECKPOINT_PASSWORD) {
            isJourneyUnlocked = true;
            if (drawer) drawer.classList.remove('locked');
        } else {
            // Error Feedback
            if (lockBox) lockBox.classList.add('error-shake');
            if (passwordInput) passwordInput.style.borderColor = '#ff3b30';
            setTimeout(() => {
                if (lockBox) lockBox.classList.remove('error-shake');
                if (passwordInput) passwordInput.style.borderColor = 'rgba(255,255,255,0.1)';
            }, 400);
        }
    }

    // Lock Screen Listeners
    if (unlockBtn) unlockBtn.addEventListener('click', attemptUnlock);
    if (passwordInput) passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptUnlock();
    });

    function closeDrawer() {
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    nodes.forEach(node => {
        const id = node.getAttribute('data-id');
        console.log("Attaching listener to node:", id);
        node.addEventListener('click', () => {
            openDrawer(id);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });
};

// Robust initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJourney);
} else {
    initJourney();
}

// Exposed function for dynamic content interaction
window.toggleCheckpoint = function (element) {
    const parent = element.parentElement;
    const cards = parent.querySelectorAll('.checkpoint-card');

    // Check if clicked element is already active
    const isActive = element.classList.contains('active');

    // Reset all
    cards.forEach(card => {
        card.classList.remove('active');
    });

    // If it wasn't active, make it active
    if (!isActive) {
        element.classList.add('active');
    }
};
