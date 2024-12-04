document.addEventListener("DOMContentLoaded", function() {
    // Clear search input and load products
    clearSearchInput();

    fetch('../../products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            searchProducts = data; // Load products into the global array
        })
        .catch(error => console.error('Error loading products:', error));
    
    const searchInput = document.getElementById("search-input");
    const suggestions = document.getElementById("suggestions");
    const searchIcon = document.getElementById("search-icon");

    // Event listener for input to filter suggestions
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        suggestions.innerHTML = ""; // Clear previous suggestions

        if (query) {
            const matchedProducts = searchProducts.filter(product =>
                product.name.toLowerCase().includes(query)
            ).slice(0, 10); // Limit to first 10 matched products

            matchedProducts.forEach((product) => {
                const suggestionHolder = document.createElement("div");
                suggestionHolder.id = `suggestion-holder`;
    
                const suggestionItem = document.createElement("div");
                suggestionItem.id = `suggestion-item`;
    
                // Create and append the image
                const suggestionImg = document.createElement("img");
                suggestionImg.src = product.image;
                suggestionImg.alt = product.name; 
                suggestionImg.id = `suggestion-img`;
                suggestionItem.appendChild(suggestionImg);
    
                // Create and append the name
                const suggestionName = document.createElement("h1");
                suggestionName.textContent = product.name + ` | ` + product.shopname;
                suggestionName.id = `suggestion-name`;
                suggestionItem.appendChild(suggestionName);
    
                // Create and append the price
                const suggestionPrice = document.createElement("h2");
                suggestionPrice.textContent = `${product.price}`;
                suggestionPrice.id = `suggestion-price`;
                suggestionItem.appendChild(suggestionPrice);
    
                // Add click event to redirect
                suggestionItem.addEventListener("click", () => {
                    const productLink = product.name.replace(/\s+/g, '-'); // Replace spaces with hyphens
                    const uniqueKey = `${product.name}_${product.cartplace}`;
                    setProductLinkAndNavigate(productLink, uniqueKey); // Pass variables directly without string interpolation
                });
                
                suggestionHolder.appendChild(suggestionItem);
                suggestions.appendChild(suggestionHolder);
            });

            suggestions.style.display = "block"; // Show suggestions list
        } else {
            suggestions.style.display = "none"; // Hide suggestions if no query
        }
    });

    function setProductLinkAndNavigate(productLink, uniqueKey) {
        alert(`Product Link: ${productLink}, Unique Key: ${uniqueKey}`);
    
        // Store the productLink in localStorage
        localStorage.setItem('uniqueKey', uniqueKey);
    
        // Navigate to the new page
        window.location.href = `../../template.html?product=${productLink}`;
    }

    // Hide suggestions when clicking outside the search box
    document.addEventListener("click", (event) => {
        if (!event.target.closest("#search-box")) {
            suggestions.style.display = "none";
        }
    });
});

// Function to toggle the search overlay visibility
function toggleSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    const searchBar = document.getElementById('search-bar');
    const sidebar = document.getElementById('sidebar-holder');
    const searchInput = document.getElementById('search-input');

    // If the sidebar is active, close it
    if (sidebar.classList.contains('active')) {
        toggleSidebar(event); // Assuming toggleSidebar is defined elsewhere
    }

    if (overlay.classList.contains('visible')) {
        // Hide the overlay and search bar
        searchBar.classList.remove('visible'); // Trigger slide-out and fade-out
        overlay.classList.remove('visible'); // Hide the overlay

        // Wait for the transition to finish before hiding the overlay
        setTimeout(() => {
            overlay.style.visibility = 'hidden'; // Hide the overlay
            clearSearchInput();
        }, 300); // Match this time with your CSS transition duration
    } else {
        overlay.style.visibility = 'visible'; // Show the overlay
        overlay.classList.add('visible'); // Trigger fade-in effect
        searchBar.classList.add('visible'); // Trigger slide-in effect
        
        // Focus on the search input to allow typing immediately
        setTimeout(() => {
            searchInput.focus();
        }, 300); // Wait for the animation/transition to complete before focusing
    }
}

// Function to clear the search input
function clearSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = ''; // Clear the value
    }
}

// Add event listener for pageshow to handle back navigation
window.addEventListener('pageshow', function () {
    clearSearchInput();
});

// Hide the search overlay if clicked outside the overlay
document.getElementById('search-overlay').addEventListener('click', function(event) {
    if (event.target === this && this.classList.contains('visible')) {
        toggleSearchOverlay(); // Close the overlay if it's open
        setTimeout(() => {
            clearSearchInput();
        }, 300);
    }
});
