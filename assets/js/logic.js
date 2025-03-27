/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var clinicianLoginSection = document.getElementById("clinician-login");
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password";
const patientLoginForm = document.getElementById("patientLoginForm");
const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const errorMessage = document.getElementById("error-message");

/* Patient Login Form */
patientLoginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the input values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate against our demo credentials
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    // Successful login simulation
    errorMessage.textContent = ""; // Clear any previous error
    window.location.href = "dashboard.html"; // Redirect to a "dashboard" page
  } else {
    // Show error message
    errorMessage.textContent = "Invalid username or password.";
  }
});

/* Clinician Login Form */
clinicianLoginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get the input values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validate against our demo credentials
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    // Successful login simulation
    errorMessage.textContent = ""; // Clear any previous error
    window.location.href = "clinicianDashboard.html"; // Redirect to a "dashboard" page
  } else {
    // Show error message
    errorMessage.textContent = "Invalid username or password.";
  }
});

/* EVENT LISTENERS */
document.getElementById("book-now").addEventListener("click", function () {
  if (
    patientLoginSection.style.display === "none" ||
    patientLoginSection.style.display === ""
  ) {
    clinicianLoginSection.style.display = "none";
    patientLoginSection.style.display = "block";
  } else {
    patientLoginSection.style.display = "none";
  }
});

document
  .getElementById("clinician-login-button")
  .addEventListener("click", function () {
    if (
      clinicianLoginSection.style.display === "none" ||
      clinicianLoginSection.style.display === ""
    ) {
      patientLoginSection.style.display = "none";
      clinicianLoginSection.style.display = "block";
    } else {
      clinicianLoginSection.style.display = "none";
    }
  });
