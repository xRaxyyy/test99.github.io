document.addEventListener("DOMContentLoaded", () => {

  const elToggleTheme = document.querySelector("#darkmode-box");
  const themeHeading = elToggleTheme.querySelector("h1"); // Select the h1 element

  // Apply the theme based on localStorage
  const currentTheme = localStorage.getItem('theme') || "light";
  setTheme(currentTheme); // Set the theme first

  // Update the heading text based on the current theme
  updateHeading(currentTheme);

  // Add event listener for theme toggle button
  elToggleTheme.addEventListener("click", () => {
    const newTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    updateHeading(newTheme);
  });

  // Function to set the theme and update localStorage
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme; // Set the theme on the document element
    localStorage.setItem('theme', theme); // Store the theme in localStorage
  }

  // Function to update the h1 text based on the theme
  function updateHeading(theme) {
    if (theme === "dark") {
      themeHeading.textContent = "Light Mode";  // Change text to Dark Mode when dark theme is enabled
    } else {
      themeHeading.textContent = "Dark Mode"; // Change text to Light Mode when light theme is enabled
    }
  }
});

