document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        speed: 800,
        parallax: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    console.log('Vertical NFT Slider initialized:', swiper);
});

