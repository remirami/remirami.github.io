(function () {
    const STORAGE_KEY = 'portfolio-lang';
    const DEFAULT_LANG = 'fi';
    function setLang(lang) {
        document.documentElement.lang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        // Swap text for all translatable elements
        document.querySelectorAll('[data-fi][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (el.tagName === 'H1' || el.innerHTML.includes('<br>')) {
                // Preserve <br> tags inside headings
                el.innerHTML = text.replace(/&lt;br&gt;/g, '<br>');
            } else {
                el.textContent = text;
            }
        });
        // Update toggle button active state
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.lang === lang);
        });
    }
    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        const saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        // Toggle button click handler
        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const current = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
                setLang(current === 'fi' ? 'en' : 'fi');
            });
        }
        setLang(saved);
    });
})();
