/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var patientSignupSection = document.getElementById("patient-signup");
var clinicianLoginSection = document.getElementById("clinician-login");
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password";
const patientLoginForm = document.getElementById("patientLoginForm");
const patientSignupForm = document.getElementById("patientSignupForm");
const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const errorMessage = document.getElementById("error-message");

/* Patient Login Form */
patientLoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the from refreshing the page

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

/* Patient Signup Form */
patientSignupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form field values
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("passwordSignup").value;

    // For demonstration
    if (fullName && email && password) {
        document.getElementById("signupMessage").textContent = "Signup successful! Welcome, " + fullName;
        document.getElementById("signupForm").reset();
    } else {
        document.getElementById("signupMessage").textContent = "Please fill out all fields.";
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
document.getElementById("toggle-login").addEventListener("click", function () {
    patientSignupSection.style.display = "none";
    patientLoginSection.style.display = "block"
  });

document.getElementById("toggle-signup").addEventListener("click", function () {
    patientLoginSection.style.display = "none";
    patientSignupSection.style.display = "block"
  });

document.getElementById("book-now").addEventListener("click", function () {
    if (
        patientSignupSection.style.display === "none" ||
        patientSignupSection.style.display === ""
    ) {
        clinicianLoginSection.style.display = "none";
        patientLoginSection.style.display = "none";
        patientSignupSection.style.display = "block";
    } else {
        patientSignupSection.style.display = "none";
    }
});

document.getElementById("clinician-login-button").addEventListener("click", function () {
    if (
        clinicianLoginSection.style.display === "none" ||
        clinicianLoginSection.style.display === ""
    ) {
        patientSignupSection.style.display = "none"
        patientLoginSection.style.display = "none";
        clinicianLoginSection.style.display = "block";
    } else {
        clinicianLoginSection.style.display = "none";
    }
});
