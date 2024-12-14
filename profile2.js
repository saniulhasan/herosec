document.addEventListener('DOMContentLoaded', () => {
    const followBtn = document.getElementById('followBtn');
    const shareBtn = document.getElementById('shareBtn');
    const editBtn = document.getElementById('editBtn');
    const moreBtn = document.getElementById('moreBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const nftGrid = document.querySelector('.nft-grid');

    // Sample NFT data
    const nfts = [
        { id: 1, title: 'Cosmic Harmony', price: '0.5 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+1', category: 'on-sale' },
        { id: 2, title: 'Digital Dreams', price: '0.8 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+2', category: 'owned' },
        { id: 3, title: 'Neon Nights', price: '1.2 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+3', category: 'created' },
        { id: 4, title: 'Abstract Thoughts', price: '0.6 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+4', category: 'liked' },
        { id: 5, title: 'Pixel Paradise', price: '0.9 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+5', category: 'on-sale' },
        { id: 6, title: 'Crypto Kitty', price: '0.3 ETH', image: 'https://placeholder.svg?height=200&width=200&text=NFT+6', category: 'owned' },
    ];

    followBtn.addEventListener('click', () => {
        if (followBtn.textContent === 'Follow') {
            followBtn.textContent = 'Following';
            followBtn.style.backgroundColor = '#45a049';
            incrementFollowers();
        } else {
            followBtn.textContent = 'Follow';
            followBtn.style.backgroundColor = '#4CAF50';
            decrementFollowers();
        }
    });

    shareBtn.addEventListener('click', () => {
        alert('Sharing functionality would be implemented here.');
    });

    editBtn.addEventListener('click', () => {
        alert('Edit profile functionality would be implemented here.');
    });

    moreBtn.addEventListener('click', () => {
        alert('Additional options would be shown here.');
    });

    function incrementFollowers() {
        const followersElement = document.querySelector('.stat-value');
        let followers = parseInt(followersElement.textContent.replace(/,/g, ''));
        followers++;
        followersElement.textContent = formatNumber(followers);
    }

    function decrementFollowers() {
        const followersElement = document.querySelector('.stat-value');
        let followers = parseInt(followersElement.textContent.replace(/,/g, ''));
        if (followers > 0) {
            followers--;
            followersElement.textContent = formatNumber(followers);
        }
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn, .filter-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Animate author avatar on page load
    const authorAvatar = document.querySelector('.author-avatar');
    authorAvatar.style.opacity = '0';
    authorAvatar.style.transform = 'translateY(20px)';
    setTimeout(() => {
        authorAvatar.style.transition = 'all 0.5s ease';
        authorAvatar.style.opacity = '1';
        authorAvatar.style.transform = 'translateY(0)';
    }, 300);

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            filterNFTs(category);
        });
    });

    function filterNFTs(category) {
        const filteredNFTs = category === 'on-sale' ? nfts : nfts.filter(nft => nft.category === category);
        renderNFTs(filteredNFTs);
    }

    function renderNFTs(nftsToRender) {
        nftGrid.innerHTML = '';
        nftsToRender.forEach(nft => {
            const nftElement = document.createElement('div');
            nftElement.classList.add('nft-item');
            nftElement.innerHTML = `
                <img src="${nft.image}" alt="${nft.title}" class="nft-image">
                <div class="nft-info">
                    <h3 class="nft-title">${nft.title}</h3>
                    <p class="nft-price">${nft.price}</p>
                </div>
            `;
            nftGrid.appendChild(nftElement);
        });
    }

    // Initial render
    renderNFTs(nfts);
});