const scrollerLeft = document.querySelector(".scroller-left");
const scrollerRight = document.querySelector(".scroller-right");
const testimonialParent = document.querySelector(".testimonials-parent");
const testimonialContainers = document.querySelectorAll(".testimonial-container");
let scroll = 0;

// Function to handle scroll on mobile devices
function handleMobileScroll() {
  // Check if the screen width is less than a certain threshold (e.g., 600px)
  if (window.innerWidth < 600) {
    scrollerRight.addEventListener("click", () => {
      if (scroll == testimonialContainers.length - 1) {
        scroll = -1;
      }
      scroll++;
      testimonialParent.style.transform = `translateX(${-120 * scroll}vw)`;
    });
    scrollerLeft.addEventListener("click", () => {
      if (scroll == 0) {
        scroll = testimonialContainers.length;
      }
      scroll--;
      testimonialParent.style.transform = `translateX(${-100 * scroll}vw)`;
    });
  }
  else{
    scrollerRight.addEventListener("click", () => {
      if (scroll == testimonialContainers.length - 1) {
        scroll = -1;
      }
      scroll++;
      testimonialParent.style.transform = `translateX(${-100 * scroll}vw)`;
    });
    scrollerLeft.addEventListener("click", () => {
      if (scroll == 0) {
        scroll = testimonialContainers.length;
      }
      scroll--;
      testimonialParent.style.transform = `translateX(${-100 * scroll}vw)`;
    });

  }
}

// Call the function initially
handleMobileScroll();

// Add an event listener to handle window resize
window.addEventListener("resize", handleMobileScroll);
