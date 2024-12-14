document.addEventListener('DOMContentLoaded', () => {
    const nftGrid = document.getElementById('nft-grid');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    const nftsPerPage = 8;
    let currentPage = 1;

    // Sample NFT data (you would typically fetch this from an API)
    const nfts = [
        { id: 1, title: 'Cosmic Harmony', price: '0.5 ETH', image: 'https://placehold.co/250x250' },
        { id: 2, title: 'Digital Dreams', price: '0.8 ETH', image: 'https://placehold.co/250x250' },
        { id: 3, title: 'Neon Nights', price: '1.2 ETH', image: 'https://placehold.co/250x250' },
        { id: 4, title: 'Abstract Thoughts', price: '0.6 ETH', image: 'https://placehold.co/250x250'},
        { id: 5, title: 'Pixel Paradise', price: '0.9 ETH', image:'https://placehold.co/250x250' },
        { id: 6, title: 'Crypto Kitty', price: '0.3 ETH', image: 'https://placehold.co/250x250' },
        { id: 7, title: 'Virtual Vistas', price: '1.5 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+7' },
        { id: 8, title: 'Blockchain Beats', price: '0.7 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+8' },
        { id: 9, title: 'Ethereal Essence', price: '1.1 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+9' },
        { id: 10, title: 'Quantum Quilt', price: '0.4 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+10' },
        { id: 11, title: 'Cybernetic Sunrise', price: '0.95 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+11' },
        { id: 12, title: 'Holographic Horizons', price: '1.3 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+12' },
        { id: 13, title: 'Fractal Fantasy', price: '0.85 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+13' },
        { id: 14, title: 'Metaverse Mirage', price: '1.8 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+14' },
        { id: 15, title: 'Crypto Constellations', price: '0.75 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+15' },
        { id: 16, title: 'Digital Dreamcatcher', price: '0.55 ETH', image: 'https://placeholder.svg?height=250&width=250&text=NFT+16' },
    ];

    const totalPages = Math.ceil(nfts.length / nftsPerPage);

    function createNFTCard(nft) {
        const card = document.createElement('div');
        card.classList.add('nft-card');
        card.innerHTML = `
            <img src="${nft.image}" alt="${nft.title}" class="nft-image">
            <div class="nft-info">
                <h3 class="nft-title">${nft.title}</h3>
                <p class="nft-price">${nft.price}</p>
            </div>
        `;
        return card;
    }

    function displayNFTs(page) {
        const startIndex = (page - 1) * nftsPerPage;
        const endIndex = startIndex + nftsPerPage;
        const pageNFTs = nfts.slice(startIndex, endIndex);

        nftGrid.innerHTML = '';
        pageNFTs.forEach(nft => {
            const card = createNFTCard(nft);
            nftGrid.appendChild(card);
        });

        currentPageSpan.textContent = page;
        totalPagesSpan.textContent = totalPages;

        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = page === totalPages;
    }

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayNFTs(currentPage);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayNFTs(currentPage);
        }
    });

    // Initial display
    displayNFTs(currentPage);
});