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