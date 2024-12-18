document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nftForm');
    const imageInput = document.getElementById('nftImages');
    const imagePreview = document.getElementById('imagePreview');
    const putOnSale = document.getElementById('putOnSale');
    const instantSalePrice = document.getElementById('instantSalePrice');

    // Function to handle image preview
    function handleImagePreview(event) {
        imagePreview.innerHTML = '';
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.file = file;
                imagePreview.appendChild(img);

                const reader = new FileReader();
                reader.onload = (function(aImg) {
                    return function(e) {
                        aImg.src = e.target.result;
                    };
                })(img);
                reader.readAsDataURL(file);
            }
        }
    }

    // Function to toggle instant sale price input
    function toggleInstantSalePrice() {
        instantSalePrice.disabled = !putOnSale.checked;
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const nftData = Object.fromEntries(formData.entries());
        
        // Add file information
        nftData.images = Array.from(imageInput.files).map(file => file.name);

        // Validate form data
        if (!validateForm(nftData)) {
            return;
        }

        // Here you would typically send this data to your backend
        console.log('NFT Data:', nftData);
        
        // For demonstration purposes, we'll just show an alert
        alert('NFT created successfully!');
        
        // Reset form after submission
        form.reset();
        imagePreview.innerHTML = '';
        toggleInstantSalePrice();
    }

    // Function to validate form data
    function validateForm(data) {
        if (!data.productName) {
            alert('Please enter a product name.');
            return false;
        }
        if (!data.description) {
            alert('Please enter a description.');
            return false;
        }
        if (!data.price || isNaN(data.price) || data.price <= 0) {
            alert('Please enter a valid price.');
            return false;
        }
        if (data.royalty && (isNaN(data.royalty) || data.royalty < 0 || data.royalty > 100)) {
            alert('Please enter a valid royalty percentage (0-100).');
            return false;
        }
        if (data.putOnSale && (!data.instantSalePrice || isNaN(data.instantSalePrice) || data.instantSalePrice <= 0)) {
            alert('Please enter a valid instant sale price.');
            return false;
        }
        if (data.images.length === 0) {
            alert('Please upload at least one image.');
            return false;
        }
        return true;
    }

    // Event listeners
    imageInput.addEventListener('change', handleImagePreview);
    putOnSale.addEventListener('change', toggleInstantSalePrice);
    form.addEventListener('submit', handleSubmit);

    // Initialize instant sale price state
    toggleInstantSalePrice();
});