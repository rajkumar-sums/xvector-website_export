document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => el.classList.add('hidden'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // 2. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Roadmap Timeline Scroll Effect (BENEFITS Section)
    const roadmapTimeline = document.querySelector('.roadmap-timeline');
    const progressLine = document.querySelector('.roadmap-progress');
    const roadmapItems = document.querySelectorAll('.roadmap-item');

    function updateRoadmap() {
        if (!roadmapTimeline || !progressLine) return;

        const timelineRect = roadmapTimeline.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const centerLine = viewportHeight / 2;

        const scrollDistance = centerLine - timelineTop;
        let progressPercentage = (scrollDistance / timelineHeight) * 100;

        progressPercentage = Math.max(0, Math.min(100, progressPercentage));
        progressLine.style.height = `${progressPercentage}%`;

        roadmapItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            if ((itemRect.top + itemRect.height / 2) < centerLine) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    if (roadmapTimeline) {
        window.addEventListener('scroll', updateRoadmap);
        updateRoadmap(); // Initial check
    }

    // 5. Initialize Leaflet Map
    if (document.getElementById('map')) {
        // Center on Europe/Asia crossover
        const map = L.map('map', {
            center: [30, 20],
            zoom: 2,
            zoomControl: true, // Enabled zoom
            scrollWheelZoom: false, // Keep page scroll smooth
            bg: '#050505'
        });

        // Dark/Black Map Tiles (CartoDB Dark Matter)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            noWrap: true // Prevent repeating world
        }).addTo(map);

        // Neon Green Marker Icon with Pulse
        const blueIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='background-color:#ccff00; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px #ccff00; border: 2px solid black;'></div>",
            iconSize: [12, 12],
            iconAnchor: [6, 6]
        });

        const locations = [
            { name: "Kathmandu, Nepal", coords: [27.7172, 85.3240] },
            { name: "Berlin, Germany", coords: [52.5200, 13.4050] },
            { name: "Amsterdam, Netherlands", coords: [52.3676, 4.9041] },
            { name: "New York, USA", coords: [40.7128, -74.0060] },
            { name: "Dubai, UAE", coords: [25.2048, 55.2708] },
            { name: "Helsinki, Finland", coords: [60.1699, 24.9384] }
        ];

        locations.forEach(loc => {
            L.marker(loc.coords, { icon: blueIcon }).addTo(map)
                .bindPopup(`<b style="color:black">${loc.name}</b>`);
        });
    }
    // 6. Check URL Hash for Deep Linking
    if (window.location.hash === '#apply') {
        setTimeout(() => openDrawer(), 500);
    }
});

/* --- Application Drawer Logic --- */
function openDrawer(e) {
    if (e) e.preventDefault();
    const drawer = document.getElementById('application-drawer');
    if (drawer) {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeDrawer() {
    const drawer = document.getElementById('application-drawer');
    if (drawer) {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        // Remove hash without scrolling
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}

function copyApplicationLink() {
    const url = window.location.origin + window.location.pathname + "#apply";
    navigator.clipboard.writeText(url).then(() => {
        alert("Link copied to clipboard! Share this URL to let others apply immediately:\n" + url);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Could not copy link. Manually copy this:\n" + url);
    });
}

async function submitApplication(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    // Explicit Validation for all fields
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const idea = form.querySelector('[name="idea"]').value.trim();
    const fileInput = form.querySelector('input[type="file"]');

    if (!name || !email || !phone || !idea) {
        alert("All fields are mandatory. Please fill in all details.");
        return;
    }

    if (fileInput && !fileInput.files.length) {
        alert("Please attach your Pitch Deck or Resume.");
        return;
    }

    // Set UI to loading state
    btn.innerText = "Sending Application...";
    btn.disabled = true;

    try {
        const formData = new FormData(form);

        // Detect if running on localhost for testing
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (isLocalhost) {
            // Simulate successful submission for local testing
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

            // Success! Show success screen
            form.style.display = 'none';
            document.getElementById('application-success').style.display = 'block';

            // Save submission state to localStorage
            localStorage.setItem('xvector_applied', 'true');

            // Show share icon for future visits
            document.getElementById('share-icon-btn').style.display = 'block';
        } else {
            // Production: Use actual Vercel Serverless Function
            const response = await fetch("/api/apply", {
                method: "POST",
                body: formData,
                // Removed headers as fetch handles boundary for FormData automatically
            });

            if (response.ok) {
                // Success! Show success screen
                form.style.display = 'none';
                document.getElementById('application-success').style.display = 'block';

                // Save submission state to localStorage
                localStorage.setItem('xvector_applied', 'true');

                // Show share icon for future visits
                document.getElementById('share-icon-btn').style.display = 'block';
            } else {
                const result = await response.json();
                throw new Error(result.error || "Submission failed");
            }
        }
    } catch (error) {
        console.error("Submission Error:", error);
        alert("Oops! There was a problem sending your application. \n\nPlease try again or send your pitch deck directly to info@xvector.fi");
    } finally {
        // Reset button state
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// Show success screen (for persistent share icon)
function showSuccessScreen() {
    document.getElementById('application-form').style.display = 'none';
    document.getElementById('application-success').style.display = 'block';
}

// Social Sharing Functions
function shareToFacebook() {
    const url = encodeURIComponent('https://www.xvector.fi/?ref=applicant');
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToLinkedIn() {
    const url = encodeURIComponent('https://www.xvector.fi/?ref=applicant');
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function shareToTwitter() {
    const text = encodeURIComponent('I just applied to XVector - turning my idea into a real startup! 🚀');
    const url = encodeURIComponent('https://www.xvector.fi/?ref=applicant');
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}

function downloadBanner() {
    // Create a download link for the banner image
    const link = document.createElement('a');
    link.href = 'assets/applied-banner.jpg';
    link.download = 'xvector-application-banner.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function copyShareableLink() {
    const shareUrl = 'https://www.xvector.fi/?ref=applicant';
    navigator.clipboard.writeText(shareUrl).then(() => {
        alert('✅ Link copied to clipboard!\n\nShare it on your socials!');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Link copied to clipboard!\n\nShare it on your socials!');
    });
}

// Check if user has already applied (on page load)
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('xvector_applied') === 'true') {
        document.getElementById('share-icon-btn').style.display = 'block';
    }

    // File Upload Display Handler
    const fileInput = document.getElementById('fileInp');
    const fileList = document.getElementById('file-list');
    const fileItems = document.getElementById('file-items');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            const files = this.files;
            if (files.length > 0) {
                fileList.style.display = 'block';
                fileItems.innerHTML = '';

                Array.from(files).forEach(file => {
                    const li = document.createElement('li');
                    li.style.cssText = 'padding: 8px; background: rgba(204, 255, 0, 0.1); border: 1px solid rgba(204, 255, 0, 0.3); border-radius: 8px; margin-bottom: 6px; font-size: 13px; color: var(--text-primary); display: flex; align-items: center; gap: 8px;';
                    li.innerHTML = `<span style="color: var(--color-accent);">✓</span> ${file.name} <span style="color: var(--text-secondary); font-size: 11px;">(${(file.size / 1024).toFixed(1)} KB)</span>`;
                    fileItems.appendChild(li);
                });
            } else {
                fileList.style.display = 'none';
            }
        });
    }
});

// Share Application Form function
function shareApplicationForm() {
    const applicationUrl = 'https://www.xvector.fi/#apply';
    const title = 'Apply to XVector - Turn Your Idea Into a Real Startup';
    const text = 'Join XVector Cohort I and turn your idea into a working business! Apply now 🚀';

    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: applicationUrl
        }).catch((error) => console.log('Share cancelled', error));
    } else {
        // Fallback: Copy link to clipboard
        navigator.clipboard.writeText(applicationUrl).then(() => {
            alert('✅ Application link copied to clipboard!\n\nShare it with potential founders:\n' + applicationUrl);
        }).catch(() => {
            // Extra fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = applicationUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('✅ Application link copied to clipboard!\n\nShare it with potential founders:\n' + applicationUrl);
        });
    }
}

/* --- Hero Section: Neural Vector Animation --- */
/* --- Hero Section: Warp Speed Animation --- */
class WarpAnimation {
    constructor() {
        this.canvas = document.getElementById('hero-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 400;
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.init(); // Re-init elements for density
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.stars = [];
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push(new Star(this.canvas.width, this.canvas.height));
        }
    }

    animate() {
        // Slight opacity and dark background for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.stars.forEach(star => {
            star.update();
            star.draw(this.ctx, this.centerX, this.centerY);
        });

        requestAnimationFrame(() => this.animate());
    }
}

class Star {
    constructor(w, h) {
        this.reset(w, h);
    }

    reset(w, h) {
        this.x = (Math.random() - 0.5) * w * 2;
        this.y = (Math.random() - 0.5) * h * 2;
        this.z = Math.random() * w;
        this.pz = this.z;
    }

    update() {
        this.pz = this.z;
        this.z -= 15; // Velocity
        if (this.z <= 1) {
            this.reset(window.innerWidth, window.innerHeight);
            this.pz = this.z;
        }
    }

    draw(ctx, centerX, centerY) {
        // Perspective projection
        const x = (this.x / this.z) * (window.innerWidth / 2) + centerX;
        const y = (this.y / this.z) * (window.innerHeight / 2) + centerY;

        const px = (this.x / this.pz) * (window.innerWidth / 2) + centerX;
        const py = (this.y / this.pz) * (window.innerHeight / 2) + centerY;

        const radius = (1 - this.z / window.innerWidth) * 2;
        const opacity = (1 - this.z / window.innerWidth);

        ctx.beginPath();
        // Brand color: #ccff00
        ctx.strokeStyle = `rgba(204, 255, 0, ${opacity})`;
        ctx.lineWidth = radius;
        ctx.lineCap = 'round';
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

// Initialize Hero Animation
document.addEventListener('DOMContentLoaded', () => {
    new WarpAnimation();
});

/* --- Mobile Menu Toggle --- */
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    // Only toggle if elements exist (mobile view check via CSS display property isn't strictly necessary if logic is sound, but good for safety)
    if (navLinks && menuBtn) {
        // We only want to toggle if the button is actually visible (mobile mode)
        // OR simpler: just toggle classes. CSS handles whether .active effects are visible.
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');

        // Prevent background scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

