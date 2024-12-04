document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopBtn = document.getElementById("scroll-btn");

    window.onscroll = function () {
        if (document.body.scrollTop > 750 || document.documentElement.scrollTop > 750) {
            if (!scrollToTopBtn.classList.contains("show")) {
                scrollToTopBtn.style.display = "block"; // Make the button renderable
                setTimeout(() => scrollToTopBtn.classList.add("show"), 10);
            }
        } else {
            if (scrollToTopBtn.classList.contains("show")) {
                scrollToTopBtn.classList.remove("show");
                setTimeout(() => {
                    if (!scrollToTopBtn.classList.contains("show")) {
                        scrollToTopBtn.style.display = "none";
                    }
                }, 300); // Match the CSS transition duration (0.3s)
            }
        }
    };

    if (scrollToTopBtn) {
    // Smooth scroll to top
    scrollToTopBtn.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }};
});
