document.addEventListener('DOMContentLoaded', () => {
    const collectionsGrid = document.getElementById('collections-grid');

    // Sample collection data
    const collections = [
        { id: 1, name: 'Cubic Trad', items: 27, mainImage: 'https://placehold.co/200x300' },
        { id: 2, name: 'Diamond Dog', items: 20, mainImage: 'https://placehold.co/199x298' },
        { id: 3, name: 'Morgan11', items: 15, mainImage: 'https://placehold.co/199x298'},
        { id: 4, name: 'Orthogon#720', items: 10, mainImage: 'https://placeholder.svg?height=199&width=298&text=Collection+4' },
        { id: 5, name: 'Pixel Masters', items: 32, mainImage: 'https://placeholder.svg?height=199&width=298&text=Collection+5' },
        { id: 6, name: 'Crypto Arts', items: 18, mainImage: 'https://placeholder.svg?height=199&width=298&text=Collection+6' },
        { id: 7, name: 'Digital Dreams', items: 25, mainImage: 'https://placeholder.svg?height=199&width=298&text=Collection+7' },
        { id: 8, name: 'NFT World', items: 40, mainImage: 'https://placeholder.svg?height=199&width=298&text=Collection+8' }
    ];

    function createCollectionCard(collection) {
        return `
            <div class="collection-card">
                <img src="${collection.mainImage}" alt="${collection.name}" class="main-image">
                <div class="profile-section">
                    <div class="side-image"></div>
                    <div class="profile-image"></div>
                    <div class="side-image"></div>
                </div>
                <div class="collection-info">
                    <h2 class="collection-name">${collection.name}</h2>
                    <span class="items-count">${collection.items} items</span>
                </div>
            </div>
        `;
    }

    // Render collections
    function renderCollections() {
        collectionsGrid.innerHTML = collections
            .map(collection => createCollectionCard(collection))
            .join('');
    }

    // Add hover effect to collection cards
    function addHoverEffects() {
        const cards = document.querySelectorAll('.collection-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.transition = 'transform 0.3s ease';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize the page
    renderCollections();
    addHoverEffects();

    // Optional: Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            imageObserver.observe(img);
        });
    }
});