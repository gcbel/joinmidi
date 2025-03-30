/* VARIABLES */
const hamburgerMenu = document.querySelector("#hamburger-menu-outer");
const hamburgerNav = document.querySelector("#hamburger-nav");
const regularNav = document.querySelector("#regular-nav");

/* FUNCTIONS */
/* Handle toggling of hamburger navugation links */
function toggleNav() {
  hamburgerNav.classList.toggle("hidden");
}

/* Handle showing/hiding of nav */
function handleResize() {
  if (window.innerWidth <= 696) {
    hamburgerMenu.classList.remove("hidden");
    regularNav.classList.add("hidden");
  } else {
    hamburgerMenu.classList.add("hidden");
    regularNav.classList.remove("hidden");
  }
}

/* EVENT LISTENERS */
window.addEventListener("resize", handleResize);
hamburgerMenu.addEventListener("change", toggleNav);

/* INITIALIZERS */
window.onload = handleResize;
document.addEventListener("DOMContentLoaded", handleResize);
