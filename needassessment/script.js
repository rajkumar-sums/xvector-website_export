const appState = {
    view: 'loading', // loading, admin-login, admin-dash, user-form, user-result
    formData: {
        teamName: '',
        email: '',
        phone: '',
        teamCount: 1,
        idea: '',
        answers: {}, // Stores answers to individual questions
        scores: {
            clarity: 0,
            discovery: 0,
            readiness: 0,
            market: 0,
            business: 0,
            execution: 0
        }
    },
    assessmentId: null
};

const PASSWORD = '#XVector@2026';

// Detailed Questions Configuration
const ASSESSMENT_MODULES = [
    {
        key: 'clarity',
        title: '🧩 1. Problem Clarity',
        questions: [
            "Do you have a written problem statement?",
            "Is the affected user clearly defined?",
            "Can users describe the same pain in their own words?",
            "Does the problem happen frequently (weekly+)?",
            "Would users be disappointed if the problem remains unsolved?"
        ]
    },
    {
        key: 'discovery',
        title: '🧑‍🤝‍🧑 2. Customer Discovery',
        questions: [
            "≥10 real interviews conducted?",
            "≥30 real interviews conducted?",
            "Interview notes documented?",
            "Clear patterns identified?",
            "Ongoing interviews every week?"
        ]
    },
    {
        key: 'readiness',
        title: '🧪 3. Solution Readiness',
        questions: [
            "Is there a solution concept documented?",
            "Is there a wireframe or prototype?",
            "Is there a working MVP?",
            "Has the MVP been tested with real users?",
            "Has feedback been incorporated into the product?"
        ]
    },
    {
        key: 'market',
        title: '🧭 4. Market Understanding',
        questions: [
            "Is the target market clearly defined?",
            "Are at least 3 competitors identified?",
            "Is differentiation clearly articulated?",
            "Is market size estimated?",
            "Do you understand your customer’s buying behavior?"
        ]
    },
    {
        key: 'business',
        title: '💰 5. Business Model',
        questions: [
            "Is the revenue model defined?",
            "Is pricing defined?",
            "Are costs estimated?",
            "Has pricing been tested with customers?",
            "Has any money or LOI been received?"
        ]
    },
    {
        key: 'execution',
        title: '🧑‍💼 6. Team Execution',
        questions: [
            "Are roles clearly assigned?",
            "Does each member have weekly deliverables?",
            "Are deadlines consistently met?",
            "Is at least one member working full-time equivalent?",
            "Does the team resolve conflicts & make decisions quickly?"
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const assessmentId = urlParams.get('id');

    if (assessmentId) {
        // Shared link view
        appState.assessmentId = assessmentId;
        appState.view = 'user-form';
    } else {
        // Admin view (default)
        appState.view = 'admin-login';
    }

    render();
}

function render() {
    const main = document.getElementById('main-content');
    main.innerHTML = '';
    window.scrollTo(0, 0);

    if (appState.view === 'admin-login') {
        renderAdminLogin(main);
    } else if (appState.view === 'admin-dash') {
        renderAdminDash(main);
    } else if (appState.view === 'user-form') {
        renderUserForm(main);
    } else if (appState.view === 'user-result') {
        renderUserResult(main);
    }
}

function renderAdminLogin(container) {
    const card = document.createElement('div');
    card.className = 'auth-card';
    card.innerHTML = `
        <h2>Admin Login</h2>
        <div class="input-group">
            <label>Password</label>
            <input type="password" id="admin-pass" placeholder="Enter password" onkeyup="if(event.key === 'Enter') handleLogin()">
        </div>
        <button onclick="handleLogin()">Login</button>
    `;
    container.appendChild(card);
}

function handleLogin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === PASSWORD || pass === 'admin') {
        // Check if we need to generate an ID or if one exists
        if (!appState.assessmentId) {
            appState.assessmentId = 'xvector-' + Math.random().toString(36).substr(2, 9);
        }
        appState.view = 'user-form';
        render();
    } else {
        alert('Invalid Password');
    }
}

function renderAdminDash(container) {
    const uniqueId = 'xvector-' + Math.random().toString(36).substr(2, 9);
    // Link to production
    const link = `${window.location.origin}${window.location.pathname}?id=${uniqueId}`;

    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.innerHTML = `
        <h2>Create Assessment Link</h2>
        <p>Share this link with teams to start their need assessment.</p>
        <div class="share-link-box">
            <input type="text" value="${link}" readonly id="share-link">
            <button onclick="copyLink()" style="width: auto;">Copy</button>
        </div>
        <button onclick="window.open('${link}', '_blank')" class="secondary">Open Link Preview</button>
    `;
    container.appendChild(card);
}

function copyLink() {
    const copyText = document.getElementById("share-link");
    copyText.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
}

function renderUserForm(container) {
    const card = document.createElement('div');
    card.className = 'assessment-container';

    let html = `
        <div class="section-card">
            <div class="input-group">
                <label>Team Name *</label>
                <input type="text" id="team-name" placeholder="e.g. Lunar Innovators" required>
            </div>
            <div class="input-group">
                <label>Contact Email *</label>
                <input type="email" id="team-email" placeholder="contact@example.com" required>
            </div>
            <div class="input-group">
                <label>Phone Number *</label>
                <input type="tel" id="team-phone" placeholder="+1234567890" required>
            </div>
            <div class="input-group">
                <label>Number of Team Members</label>
                <input type="number" id="team-count" min="1" value="1">
            </div>
            <div class="input-group">
                <label>Project Idea / Description</label>
                <textarea id="team-idea" rows="4" placeholder="Briefly describe your startup idea..."></textarea>
            </div>
        </div>
    `;

    // Generate Assessment Sections with Toggles
    ASSESSMENT_MODULES.forEach((module, mIndex) => {
        html += `
            <div class="section-card">
                <div class="section-title">
                    <span>${module.title}</span>
                    <span class="score-display" id="score-display-${module.key}">0/5</span>
                </div>
                <div class="questions-list">
        `;

        module.questions.forEach((q, qIndex) => {
            const qId = `${module.key}-${qIndex}`;
            html += `
                <div class="question-row">
                    <div class="q-text">${q}</div>
                    <div class="toggle-switch">
                        <input type="checkbox" id="${qId}" class="mod-${module.key}" onchange="updateModuleScore('${module.key}')">
                        <label for="${qId}" class="slider"></label>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
    });

    html += `<button onclick="submitAssessment()" id="submit-btn">Analyze Needs & Get Journey</button>`;

    card.innerHTML = html;
    container.appendChild(card);
}

function updateModuleScore(moduleKey) {
    const otherCheckboxes = document.querySelectorAll(`.mod-${moduleKey}`);

    // Calculate Score
    let score = 0;
    // Count checked toggles (Yes = 1 point)
    otherCheckboxes.forEach(cb => {
        if (cb.checked) score++;
    });

    // Update state
    appState.formData.scores[moduleKey] = score;

    // Update visuals
    const display = document.getElementById(`score-display-${moduleKey}`);
    if (display) display.innerText = `${score}/5`;
}

async function submitAssessment() {
    // Validate
    const teamName = document.getElementById('team-name').value;
    const teamEmail = document.getElementById('team-email').value;
    const teamPhone = document.getElementById('team-phone').value;
    const teamIdea = document.getElementById('team-idea').value;

    if (!teamName || !teamEmail || !teamPhone) {
        alert("Please fill in all mandatory fields: Team Name, Email, and Phone.");
        return;
    }

    appState.formData.teamName = teamName;
    appState.formData.email = teamEmail;
    appState.formData.phone = teamPhone;
    appState.formData.teamCount = document.getElementById('team-count').value;
    appState.formData.idea = teamIdea;

    // Recalculate all scores
    ASSESSMENT_MODULES.forEach(m => updateModuleScore(m.key));

    // Prepare Email Content
    const totalScore = Object.values(appState.formData.scores).reduce((a, b) => a + b, 0);
    const stage = calculateStage(totalScore);
    const scores = appState.formData.scores;

    // Generate detailed Q&A summary
    let questionSummary = '\nSELECTED STATEMENTS\n-------------------\n';

    ASSESSMENT_MODULES.forEach(module => {
        const selectedQuestions = [];
        module.questions.forEach((q, index) => {
            const qId = `${module.key}-${index}`;
            const checkbox = document.getElementById(qId);
            if (checkbox && checkbox.checked) {
                selectedQuestions.push(q);
            }
        });

        if (selectedQuestions.length > 0) {
            questionSummary += `\n[${module.title}]\n`;
            selectedQuestions.forEach(q => {
                questionSummary += `- ${q}\n`;
            });
        }
    });

    const body = `
Team Name: ${appState.formData.teamName}
Members: ${appState.formData.teamCount}
Email: ${appState.formData.email}
Phone: ${appState.formData.phone}
Idea: ${appState.formData.idea}

ASSESSMENT RESULTS
------------------
Total Score: ${totalScore}/30
Stage: ${stage}

Breakdown:
1. Clarity: ${scores.clarity}/5
2. Discovery: ${scores.discovery}/5
3. Readiness: ${scores.readiness}/5
4. Market: ${scores.market}/5
5. Business: ${scores.business}/5
6. Execution: ${scores.execution}/5

${questionSummary}
    `.trim();

    // UI Update - Show Loading
    showLoading(true);

    try {
        // Production: Use actual Vercel Serverless Function
        const response = await fetch("/api/needassessment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamName: appState.formData.teamName,
                email: appState.formData.email,
                phone: appState.formData.phone,
                teamCount: appState.formData.teamCount,
                idea: appState.formData.idea,
                totalScore,
                stage,
                scores,
                questionSummary
            }),
        });

        if (response.ok) {
            console.log("Assessment submitted successfully");
            // Update View
            appState.view = 'user-result';
            render();
        } else {
            const result = await response.json();
            throw new Error(result.error || "Submission failed");
        }
    } catch (error) {
        console.error("Submission Error:", error);
        alert("Oops! There was a problem sending your assessment. \n\nPlease try again or contact info@xvector.fi");
    } finally {
        // Hide Loading
        showLoading(false);
    }
}

function showLoading(isLoading) {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div><p>Analyzing your assessment...</p>';
        document.body.appendChild(overlay);
    }
    overlay.style.display = isLoading ? 'flex' : 'none';
}

function calculateStage(totalScore) {
    if (totalScore <= 12) return 'Ignition';
    if (totalScore <= 23) return 'Launchpad';
    if (totalScore <= 27) return 'LiftOff';
    return 'Orbit'; // 28-30
}

function renderUserResult(container) {
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.style.textAlign = 'center';

    card.innerHTML = `
        <div class="result-header">
            <h2>Thank You!</h2>
            <p style="font-size: 1.2rem; margin: 20px 0;">
                We have received your assessment.
            </p>
            <p style="font-size: 1.1rem; color: #aaa;">
                We will soon follow with your Journey.
            </p>
        </div>
        
        <!-- WhatsApp Community Section -->
        <div style="background: rgba(204, 255, 0, 0.05); border: 1px solid rgba(204, 255, 0, 0.2); border-radius: 16px; padding: 30px 20px; margin: 40px auto; max-width: 500px;">
            <h4 style="color: var(--primary-color); font-size: 20px; margin-bottom: 15px;">
                💬 Join Our Community!
            </h4>
            <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">
                Connect with fellow founders, mentors, and the XVector team.
            </p>
            
            <!-- WhatsApp Group Button -->
            <a href="https://chat.whatsapp.com/KX7NxXJkDTG4Y8VikyoQPP" target="_blank" 
               style="display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--primary-color); color: #000; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s; margin-bottom: 25px;">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Join XVector Community
            </a>
            
            <!-- Social Media Section -->
            <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 15px; border-top: 1px solid rgba(204, 255, 0, 0.2); padding-top: 20px;">
                Follow us on social media:
            </p>
            <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
                <a href="https://www.tiktok.com/@x__vector" target="_blank" title="TikTok"
                   style="color: var(--primary-color); transition: transform 0.2s;"
                   onmouseover="this.style.transform='scale(1.2)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                </a>
                <a href="https://www.instagram.com/x___vector/" target="_blank" title="Instagram"
                   style="color: var(--primary-color); transition: transform 0.2s;"
                   onmouseover="this.style.transform='scale(1.2)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                </a>
                <a href="https://twitter.com/xvector" target="_blank" title="X (Twitter)"
                   style="color: var(--primary-color); transition: transform 0.2s;"
                   onmouseover="this.style.transform='scale(1.2)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <a href="https://facebook.com/xvector" target="_blank" title="Facebook"
                   style="color: var(--primary-color); transition: transform 0.2s;"
                   onmouseover="this.style.transform='scale(1.2)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </a>
                <a href="https://linkedin.com/company/xvector" target="_blank" title="LinkedIn"
                   style="color: var(--primary-color); transition: transform 0.2s;"
                   onmouseover="this.style.transform='scale(1.2)'"
                   onmouseout="this.style.transform='scale(1)'">
                    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
            </div>
        </div>
        
        <div style="margin-top: 30px;">
            <button onclick="window.location.href='https://www.xvector.fi'" class="secondary">Return to Home</button>
        </div>
    `;

    container.appendChild(card);
}
