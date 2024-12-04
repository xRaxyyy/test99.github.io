function countdown() {
    const targetDate = new Date("December 31, 2024 18:00:00").getTime();
    const now = new Date().getTime();

    if (now >= targetDate) {
        // Stop counting if the target date has passed
        document.getElementById("countdown").innerHTML = "<h1>Countdown Ended</h1>";
        return;
    }

    const timeLeft = targetDate - now;

    // Time calculations
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    // Format numbers to always have 2 digits
    const formatNumber = (num) => String(num).padStart(2, '0');

    // Update the DOM with formatted numbers
    document.getElementById("days").querySelector("h1").textContent = formatNumber(days);
    document.getElementById("hours").querySelector("h1").textContent = formatNumber(hours);
    document.getElementById("minutes").querySelector("h1").textContent = formatNumber(minutes);
    document.getElementById("seconds").querySelector("h1").textContent = formatNumber(seconds);
}

// Update countdown every second
setInterval(countdown, 1000);

// Initial call to display the correct time immediately
countdown();