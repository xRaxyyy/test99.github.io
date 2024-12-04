let sidebarOpened = false; // Track if the sidebar has been opened before

// Toggle sidebar when clicking on the sidebar-holder but not the sidebar itself
function toggleSidebar(event) {
    const overlay = document.getElementById('search-overlay');
    const sidebar = document.getElementById('sidebar');
    const sidebarHolder = document.getElementById('sidebar-holder');

    if (overlay.classList.contains('visible')) {
        toggleSearchOverlay(event); // Close the sidebar
    }

    // Check if the click is on the sidebar-holder but not on the sidebar
    if (!sidebar.contains(event.target)) {
        // Toggle sidebar visibility
        sidebar.classList.toggle('active');
        sidebarHolder.classList.toggle('active');

        if (sidebarOpened) {
            // Close all open dropdowns
            const openSubmenus = document.querySelectorAll('.sub-menu.show');
            const openIcons = document.querySelectorAll('.rotate');
            
            openSubmenus.forEach(submenu => submenu.classList.remove('show'));
            openIcons.forEach(icon => icon.classList.remove('rotate'));
        }

        if (!sidebarOpened) {
            // Check for any sub-menu with an active <li> and open the corresponding submenu
            const activeDropdown = document.querySelector('.sub-menu .active');
            if (activeDropdown) {
                const submenu = activeDropdown.closest('.sub-menu');
                const dropdownButton = submenu.closest('li').querySelector('.dropdown-btn');
                const icon = dropdownButton.querySelector('.fa-chevron-down');

                // Open the submenu if an active item is found
                submenu.classList.add('show');
                icon.classList.add('rotate');
            }
            sidebarOpened = true; // Mark the sidebar as opened
        }
    }
}

// Toggle the submenu when clicking on the icon
function toggleSubMenu(icon) {
    // Get all currently active submenus and icons
    const activeSubmenus = document.querySelectorAll('.sub-menu.show');
    const activeIcons = document.querySelectorAll('.rotate');

    // Get the current submenu and icon
    const submenu = icon.closest('li').querySelector('.sub-menu');

    // Check if the current submenu is already active
    const isCurrentActive = submenu.classList.contains('show');

    // Remove the 'show' and 'rotate' classes from all other elements
    activeSubmenus.forEach(activeSubmenu => {
        if (activeSubmenu !== submenu) activeSubmenu.classList.remove('show');
    });
    activeIcons.forEach(activeIcon => {
        if (activeIcon !== icon) activeIcon.classList.remove('rotate');
    });

    // Toggle the current submenu and icon
    submenu.classList.toggle('show', !isCurrentActive);
    icon.classList.toggle('rotate', !isCurrentActive);
}

// Function to handle dropdown toggle for both sidebar and sub-menu
function toggleDropdown(clickedElement) {
    const allDropdownContents = document.querySelectorAll('#category-dropdown, .sub-menu');
    const allArrowIcons = document.querySelectorAll('.arrow-icon, .fa-chevron-down');

    const dropdownContent = clickedElement.nextElementSibling;
    const arrowIcon = clickedElement.querySelector('.arrow-icon') || clickedElement.querySelector('.fa-chevron-down');

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

function openActiveDropdowns() {
    // Open sidebar dropdowns
    const sidebarBoxes = document.querySelectorAll('#sidebar-box');
    if (sidebarBoxes.length > 0) {
        sidebarBoxes.forEach((box) => {
            const dropdownContent = box.querySelector('#category-dropdown');
            const categoryButtons = box.querySelectorAll('#category-btn > a');

            if (dropdownContent && categoryButtons.length > 0) {
                const hasActiveCategory = Array.from(categoryButtons).some(link => link.classList.contains('active'));

                if (hasActiveCategory) {
                    dropdownContent.classList.add('show'); // Open dropdown
                    const arrowIcon = box.querySelector('.arrow-icon');
                    if (arrowIcon) arrowIcon.classList.add('active'); // Rotate arrow icon
                }
            }
        });
    }

    // Open sub-menu dropdown (if active class is present)
    const subMenuButtons = document.querySelectorAll('.dropdown-btn');
    if (subMenuButtons.length > 0) {
        subMenuButtons.forEach((button) => {
            const subMenu = button.nextElementSibling;
            const subMenuLinks = subMenu ? subMenu.querySelectorAll('a') : [];

            if (subMenu && subMenuLinks.length > 0) {
                const hasActiveLink = Array.from(subMenuLinks).some(link => link.classList.contains('active'));

                if (hasActiveLink) {
                    subMenu.classList.add('show'); // Open sub-menu
                    const subMenuArrowIcon = button.querySelector('.fa-chevron-down');
                    if (subMenuArrowIcon) subMenuArrowIcon.classList.add('active'); // Rotate arrow icon
                }
            }
        });
    }
}


// Call the function to open dropdowns on page load
document.addEventListener('DOMContentLoaded', openActiveDropdowns);
