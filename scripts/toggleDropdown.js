// Function to handle dropdown toggle
function toggleDropdown(clickedElement) {
    const allDropdownContents = document.querySelectorAll('#category-dropdown');
    const allArrowIcons = document.querySelectorAll('.arrow-icon');

    const dropdownContent = clickedElement.nextElementSibling;
    const arrowIcon = clickedElement.querySelector('.arrow-icon');

    // Close all other dropdowns and reset their arrow icons
    allDropdownContents.forEach(content => {
        if (content !== dropdownContent) {
            content.classList.remove('show');
        }
    });

    allArrowIcons.forEach(icon => {
        if (icon !== arrowIcon) {
            icon.classList.remove('active');
        }
    });

    // Toggle the clicked dropdown and arrow icon
    dropdownContent.classList.toggle('show');
    arrowIcon.classList.toggle('active');
}

// Function to open the active dropdown on page load
function openActiveDropdowns() {
    // Check each sidebar box
    const sidebarBoxes = document.querySelectorAll('#sidebar-box');

    sidebarBoxes.forEach((box) => {
        const dropdownContent = box.querySelector('#category-dropdown');
        const categoryButtons = box.querySelectorAll('#category-btn > a');

        // Check if any category link in this box is active
        const hasActiveCategory = Array.from(categoryButtons).some(link => link.classList.contains('show'));

        if (hasActiveCategory) {
            dropdownContent.classList.add('show'); // Open dropdown
            const arrowIcon = box.querySelector('.arrow-icon');
            arrowIcon.classList.add('active'); // Rotate arrow icon
        }
    });
}

// Call the function to open dropdowns on page load
document.addEventListener('DOMContentLoaded', openActiveDropdowns);
