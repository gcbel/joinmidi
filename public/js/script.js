/* VARIABLES */
const icon = document.getElementById("browser-icon");
const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

/* FUNCTIONS */
function updateIcon(darkMode) {
  if (darkMode.matches) {
    icon.href = "images/logo-dark.png";
  } else {
    icon.href = "images/logo.png";
  }
}

/* INITIALIZER */
document.addEventListener("DOMContentLoaded", () => {
  updateIcon(darkMode);
});
