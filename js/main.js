// ---------- Theme (dark/light) with persistence ----------
function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
}

function toggleTheme() {
    const next = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
}

(function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark');
})();

// ---------- Certificate preview modal (skills page) ----------
function previewCertificate(imgSrc, title) {
    const modalEl = document.getElementById('certModal');
    if (!modalEl) return;
    document.getElementById('certModalImg').src = imgSrc;
    document.getElementById('certModalLabel').textContent = title;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// ---------- Contact form: opens the visitor's email app with the message filled in ----------
(function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const TO = 'galalreem9@gmail.com';

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const val = id => document.getElementById(id).value.trim();
        const name = val('firstName') + ' ' + val('lastName');
        const body = 'Name: ' + name + '\nEmail: ' + val('emailAddress') + '\n\n' + val('messageText');
        const url = 'mailto:' + TO +
            '?subject=' + encodeURIComponent(val('messageSubject')) +
            '&body=' + encodeURIComponent(body);

        const box = document.getElementById('alertContainer');
        box.innerHTML =
            '<div class="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2" role="alert">' +
            '<i class="bi bi-check-circle-fill"></i>' +
            '<div>Opening your email app to send the message. If nothing opens, write to <a href="mailto:' + TO + '">' + TO + '</a>.</div>' +
            '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

        window.location.href = url;
        form.reset();
    });
})();
