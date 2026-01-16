const contentData = {
    "need-analysis": {
        title: "Need Analysis",
        subtitle: "Reality Check",
        content: `
            <div class="detail-section">
                <h4>Market Need (Problem-Solution Fit)</h4>
                <div class="info-item">
                    <span class="info-label">Problem Intensity</span>
                    <div class="info-value">
                        ⭐⭐⭐⭐☆ (High, real, frequent)
                    </div>
                </div>
                <br>
                <p><strong>Kathmandu Valley Context:</strong></p>
                <ul>
                    <li>Growing mobile-first fashion shoppers</li>
                    <li>Low trust in online sizing, fabric, and color</li>
                    <li>Strong impulse + occasion-based buying behavior</li>
                </ul>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                    <p><strong>Existing Solutions Gap:</strong></p>
                    <ul>
                        <li>Daraz/IG Stores: Convenience but no confidence.</li>
                        <li>Physical Stores: Confidence but high time/travel cost.</li>
                    </ul>
                    <p style="margin-top: 10px; color: var(--color-primary);"><strong>Conclusion:</strong> Real, painful, and repeated problem.</p>
                </div>

                <div class="detail-section">
                    <h4>Customer Readiness</h4>
                    <div class="detail-grid">
                        <div class="info-item">
                            <span class="info-label">Smartphone Usage</span>
                            <div class="info-value">High</div>
                        </div>
                        <div class="info-item">
                            <span class="info-label">COD Mindset</span>
                            <div class="info-value">Strong (Supports Try & Buy)</div>
                        </div>
                        <div class="info-item">
                            <span class="info-label">60-Min Expectation</span>
                            <div class="info-value">Familiar (Food apps)</div>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Willingness to Try</span>
                            <div class="info-value">High (Gen Z/Millennials)</div>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Solution Readiness</h4>
                    <p>MVP exists (Android live). Delivery promise defined (60 mins).</p>
                    <div class="info-item" style="margin-top: 16px; border: 1px solid var(--color-primary);">
                        <span class="info-label">Critical Gap</span>
                        <div class="info-value">Not yet validated at scale with paying customers.</div>
                    </div>
                </div>
            </div>
        `
    },
    "positioning": {
        title: "Stage Positioning",
        subtitle: "Current Status",
        content: `
            <div class="detail-section">
                <h4 style="font-size: 32px; color: var(--color-primary);">🚦 TESTBED</h4>
                <p><strong>Real-world validation phase.</strong></p>
            </div>

            <div class="restricted-content">
                <div class="detail-grid">
                    <div class="info-item">
                        <span class="info-label">Why not Launchpad?</span>
                        <div class="info-value">
                            You already have a working product, operations model, and brand presence.
                        </div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Why not LiftOff?</span>
                        <div class="info-value">
                            Startups fail here by scaling prematurely. You haven't proven repeat usage or unit economics yet.
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    "risks": {
        title: "Risk Analysis",
        subtitle: "Critical Evaluation",
        content: `
            <div class="detail-section">
                <h4>Operational Risks (Most Dangerous)</h4>
                <div class="risk-table-row">
                    <span class="risk-name">60-min delivery failure</span>
                    <span class="risk-badge risk-critical">Critical</span>
                </div>
                <div class="risk-table-row">
                    <span class="risk-name">Inventory mismatch</span>
                    <span class="risk-badge risk-critical">Critical</span>
                </div>
            </div>

            <div class="restricted-content">
                <div class="detail-section">
                     <div class="risk-table-row">
                        <span class="risk-name">Rider wait time</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Financial Risks</h4>
                    <div class="risk-table-row">
                        <span class="risk-name">High delivery cost</span>
                        <span class="risk-badge risk-critical">Critical</span>
                    </div>
                    <div class="risk-table-row">
                        <span class="risk-name">Low try-to-buy conversion</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h4>Product & Behavioral Risks</h4>
                    <div class="risk-table-row">
                        <span class="risk-name">App UX Friction</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                    <div class="risk-table-row">
                        <span class="risk-name">Abusing Try System</span>
                        <span class="risk-badge risk-high">High</span>
                    </div>
                </div>
            </div>
        `
    },
    "roadmap": {
        title: "Linear Journey",
        subtitle: "4 Checkpoints to TESTBED Success",
        content: `
            <div class="roadmap-accordion">
                <!-- Checkpoint 1 - PREVIEW (Always Visible) -->
                <div class="checkpoint-card active" onclick="toggleCheckpoint(this)">
                    <div class="checkpoint-header">
                        <div class="checkpoint-title-group">
                            <h5>STOP 1</h5>
                            <h3>Real-World MVP Validation</h3>
                        </div>
                        <div class="checkpoint-status">+</div>
                    </div>
                    <div class="checkpoint-body">
                        <p class="mb-4"><strong>Core Assumption:</strong> "Customers want try-before-buy delivered in 60 minutes and will actually pay."</p>
                        
                        <div class="q-category">
                            <div class="q-cat-title">Customer Behavior</div>
                            <ul class="q-list">
                                <li>Do customers understand the concept without explanation?</li>
                                <li>How many items do they actually want to try?</li>
                                <li>What % buy at least one item?</li>
                                <li>Emotional reaction: Excited, rushed, or confused?</li>
                            </ul>
                        </div>

                         <div class="q-category">
                            <div class="q-cat-title">Delivery Reality</div>
                            <ul class="q-list">
                                <li>Can we consistently deliver within 60 mins?</li>
                                <li>Where does time leak (packing, wait, traffic)?</li>
                            </ul>
                        </div>
                        
                        <div class="go-no-go">
                            <span class="decision-icon">🚫</span>
                            <div class="decision-content">
                                <strong>Go/No-Go Rule</strong>
                                <p>If &lt;40% of orders result in purchase → Pause & Fix</p>
                            </div>
                        </div>

                        <!-- Mentor Layer -->
                        <div class="mentor-layer">
                            <div class="mentor-layer-title">REQUIRED MENTORS / EXPERTS</div>
                            
                            <!-- Mentor 1 -->
                            <div class="mentor-card">
                                <div class="mentor-role">Lean Startup / MVP Validation Mentor</div>
                                <div class="mentor-detail-grid">
                                    <div><span class="mentor-label">Why:</span> Prevents false positives from early excitement.</div>
                                    <div><span class="mentor-label">Help:</span> Defining success metrics, test zones & sample size.</div>
                                    <div><span class="mentor-label">Engagement:</span> Short-term (2–4 weeks), Weekly review.</div>
                                </div>
                            </div>

                            <!-- Mentor 2 -->
                            <div class="mentor-card">
                                <div class="mentor-role">Last-Mile Logistics Expert</div>
                                <div class="mentor-detail-grid">
                                    <div><span class="mentor-label">Why:</span> 60-minute promise is existential.</div>
                                    <div><span class="mentor-label">Help:</span> Rider routing, zone-planning, time buffers.</div>
                                    <div><span class="mentor-label">Engagement:</span> Field-level guidance, SOP design.</div>
                                </div>
                            </div>

                             <!-- Mentor 3 -->
                            <div class="mentor-card">
                                <div class="mentor-role">Consumer Behavior / D2C Expert</div>
                                <div class="mentor-detail-grid">
                                    <div><span class="mentor-label">Why:</span> Fashion buying is emotional, not logical.</div>
                                    <div><span class="mentor-label">Help:</span> Try limits, category prioritization, rejection reasons.</div>
                                    <div><span class="mentor-label">Engagement:</span> Advisory sessions.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- REST ARE RESTRICTED -->
                <div class="restricted-content">
                    <!-- Checkpoint 2 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                        <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 2</h5>
                                <h3>Unit Economics Validation</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                         <div class="checkpoint-body">
                            <p class="mb-4"><strong>Core Assumption:</strong> "This model can work financially at small scale."</p>
                            
                            <div class="q-category">
                                <div class="q-cat-title">Profit Reality Questions</div>
                                <ul class="q-list">
                                    <li>True cost per order (delivery + labor + ops)?</li>
                                    <li>How much rider time is wasted per failed order?</li>
                                    <li>Does limiting try items increase conversion?</li>
                                    <li>Are brand margins sufficient after returns?</li>
                                </ul>
                            </div>

                            <div class="go-no-go">
                                <span class="decision-icon">📉</span>
                                <div class="decision-content">
                                    <strong>Go/No-Go Rule</strong>
                                    <p>If contribution margin is negative in every scenario → Model redesign needed</p>
                                </div>
                            </div>

                            <div class="mentor-layer">
                                <div class="mentor-layer-title">EXPERT SUPPORT</div>
                                <div class="mentor-card">
                                    <div class="mentor-role">Unit Economics Expert</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Early revenue hides structural losses.</div>
                                        <div><span class="mentor-label">Help:</span> True cost-per-order, contribution margin modeling.</div>
                                        <div><span class="mentor-label">Engagement:</span> Data review, short intensity.</div>
                                    </div>
                                </div>
                                <div class="mentor-card">
                                    <div class="mentor-role">Operations Optimization Expert</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Small inefficiencies multiply fast.</div>
                                        <div><span class="mentor-label">Help:</span> Idle-time reduction, inventory locking, failure handling.</div>
                                        <div><span class="mentor-label">Engagement:</span> Process audits, SOP tightening.</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                    <!-- Checkpoint 3 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                         <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 3</h5>
                                <h3>Experience Optimization</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                         <div class="checkpoint-body">
                            <p class="mb-4"><strong>Core Assumption:</strong> "A smoother experience increases conversion and repeat usage."</p>
                            
                            <div class="q-category">
                                <div class="q-cat-title">Friction Removal</div>
                                <ul class="q-list">
                                    <li>Where do users drop off in the app?</li>
                                    <li>Is the try-before-buy explanation clear in &lt;10s?</li>
                                    <li>Do customers feel rushed by rider presence?</li>
                                    <li>Is payment smooth or awkward?</li>
                                </ul>
                            </div>

                            <div class="go-no-go">
                                <span class="decision-icon">😰</span>
                                <div class="decision-content">
                                    <strong>Go/No-Go Rule</strong>
                                    <p>If experience feels stressful → Do not scale traffic</p>
                                </div>
                            </div>

                            <div class="mentor-layer">
                                <div class="mentor-layer-title">EXPERT SUPPORT</div>
                                <div class="mentor-card">
                                    <div class="mentor-role">Service Design / CX Expert</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Try-before-buy is a service, not just an app feature.</div>
                                        <div><span class="mentor-label">Help:</span> Journey mapping, reducing anxiety.</div>
                                        <div><span class="mentor-label">Engagement:</span> Workshops, observation.</div>
                                    </div>
                                </div>
                                <div class="mentor-card">
                                    <div class="mentor-role">UX/Product Designer</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Small UX frictions kill conversion.</div>
                                        <div><span class="mentor-label">Help:</span> Onboarding clarity, checkout confidence.</div>
                                        <div><span class="mentor-label">Engagement:</span> Design sprints, iteration.</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                    <!-- Checkpoint 4 -->
                    <div class="checkpoint-card" onclick="toggleCheckpoint(this)">
                         <div class="checkpoint-header">
                            <div class="checkpoint-title-group">
                                <h5>STOP 4</h5>
                                <h3>Brand & Trust Flywheel</h3>
                            </div>
                            <div class="checkpoint-status">+</div>
                        </div>
                         <div class="checkpoint-body">
                            <p class="mb-4"><strong>Core Assumption:</strong> "Satisfied users will bring other users."</p>
                            
                            <div class="q-category">
                                <div class="q-cat-title">Loyalty Signals</div>
                                <ul class="q-list">
                                    <li>Do customers recommend LYT organicall?</li>
                                    <li>What % order again within 30 days?</li>
                                    <li>Are customers willing to share try-on content?</li>
                                </ul>
                            </div>

                            <div class="go-no-go">
                                <span class="decision-icon">💔</span>
                                <div class="decision-content">
                                    <strong>Go/No-Go Rule</strong>
                                    <p>If repeat rate &lt;25% → Retention problem exists</p>
                                </div>
                            </div>

                            <div class="mentor-layer">
                                <div class="mentor-layer-title">EXPERT SUPPORT</div>
                                <div class="mentor-card">
                                    <div class="mentor-role">Consumer Brand Builder</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Trust precedes scale in fashion.</div>
                                        <div><span class="mentor-label">Help:</span> Brand positioning, trust signals.</div>
                                        <div><span class="mentor-label">Engagement:</span> Strategic sessions.</div>
                                    </div>
                                </div>
                                <div class="mentor-card">
                                    <div class="mentor-role">Growth & Retention Expert</div>
                                    <div class="mentor-detail-grid">
                                        <div><span class="mentor-label">Why:</span> Growth without retention = expensive churn.</div>
                                        <div><span class="mentor-label">Help:</span> Referral mechanics, lifecycle messaging.</div>
                                        <div><span class="mentor-label">Engagement:</span> Funnel diagnostics.</div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>

                     <div class="detail-section" style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
                        <h4 style="color: var(--color-primary);">Summary Rule</h4>
                        <ul class="q-list">
                            <li><strong>Early stage:</strong> Mentors protect you from delusion.</li>
                            <li><strong>Mid stage:</strong> Experts protect you from inefficiency.</li>
                            <li><strong>Growth stage:</strong> Advisors protect you from chaos.</li>
                        </ul>
                        <p style="margin-top: 20px; color: var(--color-text-muted); font-style: italic;">
                            Current focus: TESTBED phase. LiftOff and Orbit phases will be unlocked after proving the business model.
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    "service-view": {
        title: "Service View",
        subtitle: "End-to-End Flow",
        content: `
            <div class="detail-section">
                <p style="margin-bottom: 20px;">Any break here = <strong>Churn</strong>.</p>
                <div class="service-flow">
                    <div class="flow-step">
                        <span class="flow-icon">🔍</span>
                        <span class="flow-text">Discover → Trust</span>
                    </div>
                    <div class="flow-step">
                        <span class="flow-icon">📱</span>
                        <span class="flow-text">Browse → Not Overwhelmed</span>
                    </div>
                </div>
            </div>

            <div class="restricted-content">
                <div class="service-flow">
                    <div class="flow-step">
                        <span class="flow-icon">🛒</span>
                        <span class="flow-text">Select → Clear Limits</span>
                    </div>
                    <div class="flow-step">
                        <span class="flow-icon">🚚</span>
                        <span class="flow-text">Delivery → On Time (60m)</span>
                    </div>
                    <div class="flow-step">
                        <span class="flow-icon">👗</span>
                        <span class="flow-text">Try → Comfortable, No Rush</span>
                    </div>
                    <div class="flow-step">
                        <span class="flow-icon">💳</span>
                        <span class="flow-text">Decide → Easy Payment</span>
                    </div>
                </div>
            </div>
        `
    },
    "final-truth": {
        title: "Final Truth",
        subtitle: "Founder Note",
        content: `
            <div class="detail-section">
                <div class="info-item" style="border: 1px solid var(--color-primary); background: rgba(204,255,0,0.05);">
                    <h4 style="margin-top:0;">Not a Tech Startup</h4>
                    <p>This is a logistics + behavior + trust startup.</p>
                </div>
            </div>
            
            <div class="restricted-content">
                <div class="detail-section">
                    <br>
                    <p><strong>Speed is your weapon.</strong></p>
                    <p><strong>Discipline is your defense.</strong></p>
                    <p><strong>Experience is your brand.</strong></p>
                </div>
            </div>
        `
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.journey-node');
    const drawer = document.getElementById('info-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const closeBtn = document.getElementById('drawer-close');
    const drawerContent = document.getElementById('drawer-content');

    const passwordInput = document.getElementById('password-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const lockBox = document.querySelector('.lock-box');
    let isJourneyUnlocked = false;

    function openDrawer(id) {
        const data = contentData[id];
        if (!data) return;

        // Populate Content
        drawerContent.innerHTML = `
            <h2 class="detail-title">${data.title}</h2>
            <h3 style="color: grey; margin-bottom: 30px;">${data.subtitle}</h3>
            <div class="detail-body">${data.content}</div>
        `;

        // Handle Lock State
        if (!isJourneyUnlocked) {
            drawer.classList.add('locked');
            passwordInput.value = ''; // Reset input
            setTimeout(() => passwordInput.focus(), 500); // Focus for smooth typing
        } else {
            drawer.classList.remove('locked');
        }

        // Show
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function attemptUnlock() {
        const input = passwordInput.value;
        if (input === '#XV3ct0r@2o26!') {
            isJourneyUnlocked = true;
            drawer.classList.remove('locked');

            // Success Animation or feedback could go here
        } else {
            // Error Feedback
            lockBox.classList.add('error-shake');
            passwordInput.style.borderColor = '#ff3b30';
            setTimeout(() => {
                lockBox.classList.remove('error-shake');
                passwordInput.style.borderColor = 'rgba(255,255,255,0.1)';
            }, 400);
        }
    }

    // Lock Screen Listeners
    if (unlockBtn) unlockBtn.addEventListener('click', attemptUnlock);
    if (passwordInput) passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptUnlock();
    });

    function closeDrawer() {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            const id = node.getAttribute('data-id');
            openDrawer(id);
        });
    });

    closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });
});

// Exposed function for dynamic content interaction
window.toggleCheckpoint = function (element) {
    const parent = element.parentElement;
    const cards = parent.querySelectorAll('.checkpoint-card');

    // Check if clicked element is already active
    const isActive = element.classList.contains('active');

    // Reset all
    cards.forEach(card => {
        card.classList.remove('active');
        // Add blurred effect to all non-active cards to reinforce "focus"
        // But our CSS handle "not(.active)" logic, so just removing active is enough 
        // if we trust the CSS selector .checkpoint-card:not(.active) .checkpoint-body
    });

    // If it wasn't active, make it active (Classic Accordion)
    // If it was active, we just closed it (Toggle behavior)
    if (!isActive) {
        element.classList.add('active');
    }
};
