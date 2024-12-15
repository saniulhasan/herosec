document.addEventListener('DOMContentLoaded', () => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const actionButton = document.getElementById('actionButton');
    const actionMenu = document.getElementById('actionMenu');
    const placeBidBtn = document.getElementById('placeBidBtn');
    const likeBtn = document.getElementById('likeBtn');
    const shareBtn = document.getElementById('shareBtn');
    const countdownElement = document.getElementById('countdown');
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrollTop * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Floating action button
    actionButton.addEventListener('click', () => {
        actionMenu.style.display = actionMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Place bid button
    placeBidBtn.addEventListener('click', () => {
        const currentBid = parseFloat(document.querySelector('.bid-amount').textContent);
        const newBid = prompt(`Enter your bid (current bid: ${currentBid} ETH):`);
        
        if (newBid !== null && !isNaN(newBid) && parseFloat(newBid) > currentBid) {
            document.querySelector('.bid-amount').textContent = `${parseFloat(newBid).toFixed(2)} ETH`;
            document.querySelector('.bid-usd').textContent = `$${(parseFloat(newBid) * 1700).toFixed(2)} USD`;
            
            // Update bid history
            const bidList = document.getElementById('bidList');
            const newBidItem = document.createElement('li');
            newBidItem.innerHTML = `
                <span class="bidder">You</span>
                <span class="bid">${parseFloat(newBid).toFixed(2)} ETH</span>
                <span class="time">Just now</span>
            `;
            bidList.insertBefore(newBidItem, bidList.firstChild);
            
            alert('Bid placed successfully!');
        } else if (newBid !== null) {
            alert('Invalid bid. Please enter a number higher than the current bid.');
        }
    });

    // Like button
    let isLiked = false;
    likeBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        likeBtn.textContent = isLiked ? '❤️ Liked' : '♥ Like';
    });

    // Share button
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Cosmic Dreamcatcher NFT',
                text: 'Check out this amazing NFT by NebulaArtist!',
                url: window.location.href
            }).then(() => {
                console.log('Shared successfully');
            }).catch((error) => {
                console.log('Error sharing:', error);
            });
        } else {
            alert('Web Share API is not supported in your browser. You can copy the URL to share.');
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
        
        // Update progress ring
        const totalSeconds = 24 * 60 * 60;
        const remainingSeconds = hours * 3600 + minutes * 60 + seconds;
        const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
        setProgress(progress);
        
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = 'Auction ended';
            placeBidBtn.disabled = true;
            placeBidBtn.textContent = 'Auction ended';
        }
    };
    
    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to avoid delay
});