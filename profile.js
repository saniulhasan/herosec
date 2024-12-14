document.addEventListener('DOMContentLoaded', () => {
    const nftGrid = document.querySelector('.nft-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Sample NFT data (you would typically fetch this from an API)
    const nfts = [
        { id: 1, title: 'Cosmic Harmony', price: 0.5, image: 'https://placeholder.svg?height=300&width=280', category: 'on-sale', creator: 'CryptoArtist' },
        { id: 2, title: 'Digital Dreams', price: 0.8, image: 'https://placeholder.svg?height=300&width=280', category: 'owned', creator: 'PixelMaster' },
        { id: 3, title: 'Neon Nights', price: 1.2, image: 'https://placeholder.svg?height=300&width=280', category: 'created', creator: 'John Doe' },
        { id: 4, title: 'Abstract Thoughts', price: 0.6, image: 'https://placeholder.svg?height=300&width=280', category: 'liked', creator: 'ArtBot' },
        { id: 5, title: 'Pixel Paradise', price: 0.9, image: 'https://placeholder.svg?height=300&width=280', category: 'on-sale', creator: 'John Doe' },
        { id: 6, title: 'Crypto Kitty', price: 0.3, image: 'https://placeholder.svg?height=300&width=280', category: 'owned', creator: 'BlockchainArtist' },
    ];

    // Function to create NFT item HTML
    function createNFTItem(nft) {
        return `
            <div class="nft-item" data-category="${nft.category}">
                <img src="${nft.image}" alt="${nft.title}" class="nft-image">
                <div class="nft-info">
                    <h3 class="nft-title">${nft.title}</h3>
                    <p class="nft-price">${nft.price.toFixed(2)}</p>
                    <p class="nft-creator">Created by ${nft.creator}</p>
                </div>
                <div class="nft-action" title="Add to favorites">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
            </div>
        `;
    }

    // Function to filter NFTs
    function filterNFTs(category) {
        const nftItems = document.querySelectorAll('.nft-item');
        nftItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Populate NFT grid
    nfts.forEach(nft => {
        nftGrid.innerHTML += createNFTItem(nft);
    });

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterNFTs(button.dataset.category);
        });
    });

    // Add click event listeners to favorite buttons
    document.querySelectorAll('.nft-action').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('active');
            const svg = button.querySelector('svg');
            if (button.classList.contains('active')) {
                svg.style.fill = '#e74c3c';
            } else {
                svg.style.fill = '#333';
            }
        });
    });

    // Initial filter (show all)
    filterNFTs('on-sale');
});