document.addEventListener('DOMContentLoaded', () => {
    const mainNft = document.getElementById('mainNft');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const likeBtn = document.getElementById('likeBtn');
    const shareBtn = document.getElementById('shareBtn');
    const placeBidBtn = document.getElementById('placeBidBtn');
    const countdownElement = document.getElementById('auction-countdown');

    // Image gallery
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainNft.src = thumbnail.dataset.src;
            mainNft.classList.add('fade-in');
            setTimeout(() => mainNft.classList.remove('fade-in'), 500);
        });
    });

    // Tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Like button
    let likes = 42;
    likeBtn.addEventListener('click', () => {
        likes++;
        likeBtn.textContent = `♥ ${likes}`;
        likeBtn.classList.add('liked');
        setTimeout(() => likeBtn.classList.remove('liked'), 300);
    });

    // Share button
    shareBtn.addEventListener('click', () => {
        navigator.share({
            title: 'Ethereal Dreamscape #42',
            text: 'Check out this amazing NFT!',
            url: window.location.href
        }).then(() => {
            console.log('Shared successfully');
        }).catch((error) => {
            console.log('Error sharing:', error);
        });
    });

    // Place bid button
    placeBidBtn.addEventListener('click', () => {
        const currentBid = parseFloat(document.querySelector('.bid-amount').textContent);
        const newBid = prompt(`Enter your bid (current bid: ${currentBid} ETH):`);
        
        if (newBid !== null && !isNaN(newBid) && parseFloat(newBid) > currentBid) {
            document.querySelector('.bid-amount').textContent = `${parseFloat(newBid).toFixed(2)} ETH`;
            document.querySelector('.bid-usd').textContent = `$${(parseFloat(newBid) * 1700).toFixed(2)} USD`;
            alert('Bid placed successfully!');
        } else if (newBid !== null) {
            alert('Invalid bid. Please enter a number higher than the current bid.');
        }
    });

    // Countdown timer
    const countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = 'Auction ended';
            placeBidBtn.disabled = true;
            placeBidBtn.textContent = 'Auction ended';
        }
    };
    
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to avoid delay

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tabbar functionality - This code was already present in the original code.  The update was redundant.
    //const tabButtons = document.querySelectorAll('.tab-btn');
    //const tabPanes = document.querySelectorAll('.tab-pane');

    //tabButtons.forEach(button => {
    //    button.addEventListener('click', () => {
    //        const tabName = button.dataset.tab;

    //        tabButtons.forEach(btn => btn.classList.remove('active'));
    //        tabPanes.forEach(pane => pane.classList.remove('active'));

    //        button.classList.add('active');
    //        document.getElementById(tabName).classList.add('active');
    //    });
    //});
});

