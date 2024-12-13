document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const nftCards = document.querySelectorAll('.nft-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function updateSlider() {
        const angle = (currentIndex / nftCards.length) * -360;
        sliderContainer.style.transform = `rotateY(${angle}deg)`;

        nftCards.forEach((card, index) => {
            const offset = (index - currentIndex + nftCards.length) % nftCards.length;
            const cardAngle = (offset / nftCards.length) * 360;
            const translateZ = 200;
            card.style.transform = `rotateY(${cardAngle}deg) translateZ(${translateZ}px)`;
            card.style.opacity = offset === 0 ? 1 : 0.5;
        });
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % nftCards.length;
        updateSlider();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + nftCards.length) % nftCards.length;
        updateSlider();
    }

    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Initialize the slider
    updateSlider();

    // Auto-rotate the slider
    let autoRotateInterval = setInterval(goToNext, 5000);

    // Pause auto-rotation when hovering over the slider
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoRotateInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        autoRotateInterval = setInterval(goToNext, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrev();
        } else if (e.key === 'ArrowRight') {
            goToNext();
        }
    });
});

