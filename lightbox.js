(function () {
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    const counter = document.getElementById('lightboxCounter');
    let allImages = [];
    let currentIndex = 0;
    function open(index) {
        currentIndex = index;
        update();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    function update() {
        const src = allImages[currentIndex].src;
        const alt = allImages[currentIndex].alt;
        img.src = src;
        img.alt = alt;
        counter.textContent = (currentIndex + 1) + ' / ' + allImages.length;
        prevBtn.style.display = allImages.length > 1 ? '' : 'none';
        nextBtn.style.display = allImages.length > 1 ? '' : 'none';
    }
    function prev() {
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        update();
    }
    function next() {
        currentIndex = (currentIndex + 1) % allImages.length;
        update();
    }
    document.addEventListener('DOMContentLoaded', () => {
        allImages = Array.from(document.querySelectorAll('img[data-lightbox]'));
        allImages.forEach((image, i) => {
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => open(i));
        });
        // Set "+N more" badge on card-image containers with more than 2 images
        document.querySelectorAll('.card-image').forEach(container => {
            const imgs = container.querySelectorAll('img[data-lightbox]');
            if (imgs.length > 2) {
                container.setAttribute('data-extra', '+' + (imgs.length - 2) + ' more');
            }
        });
        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
        // Close on backdrop click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        });
    });
})();
