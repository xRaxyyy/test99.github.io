window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    // Ensure the preloader appears for at least 500ms
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 150); // 500ms delay
});
