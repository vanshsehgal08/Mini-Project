const navIcon = document.querySelector(".nav-icon");
const header = document.querySelector("header");
const navBtns = document.querySelectorAll(".nav-links.btn");

let closed = false;
navIcon.addEventListener("click", () => {
  if (closed) {
    navIcon.innerHTML = '<i class="fa-solid fa-bars"></i>';
    closed = false;
  } else {
    navIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    closed = true;
  }
  header.classList.toggle("show");
  navBtns.forEach((el) => {
    el.classList.toggle("show");
  });
});

// Get the toggle button
const toggleButton = document.getElementById("darkModeToggle");

// Add event listener for the toggle button
toggleButton.addEventListener("change", () => {
    // Check if the toggle button is checked (dark mode)
    if (toggleButton.checked) {
        // Add a class to the body to enable dark mode
        document.body.classList.add("dark-mode");
    } else {
        // Remove the class to switch back to light mode
        document.body.classList.remove("dark-mode");
    }
});
