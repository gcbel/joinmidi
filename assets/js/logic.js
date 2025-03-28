/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var patientSignupSection = document.getElementById("patient-signup");
var clinicianLoginSection = document.getElementById("clinician-login");
const patientLoginForm = document.getElementById("patientLoginForm");
const patientSignupForm = document.getElementById("patientSignupForm");
const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const errorMessage = document.getElementById("error-message");

const CLINICIAN_EMAIL = "clinician@gmail.com";
const ADVOCATE_EMAIL = "advocate@gmail.com";
const NEWUSER_EMAIL = "newuser@gmail.com";
const PASSWORD = "password";

/* Patient Login Form */
patientLoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the from refreshing the page

    // Get the input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate against our demo credentials
    if ((email === ADVOCATE_EMAIL || email === NEWUSER_EMAIL) && password === PASSWORD) {
        // Successful login simulation
        errorMessage.textContent = ""; // Clear any previous error
        localStorage.setItem("email", email);
        window.location.href = "dashboard.html"; // Redirect to a "dashboard" page
    } else {
        // Show error message
        errorMessage.textContent = "Invalid email or password.";
    }
});

/* Patient Signup Form */
patientSignupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form field values
    var email = document.getElementById("email").value;
    var password = document.getElementById("passwordSignup").value;
  
    if (email && password) {
        localStorage.setItem("email", email);
        // Call Extole's createZone with the dynamic registration data.
            extole.createZone({
            name: 'registration',
            data: {
            "email": email,
            }
        });
  
        document.getElementById("signupMessage").textContent = "Signup successful!";
        window.location.href = "dashboard.html"; // Redirect to a dashboard page
    } else {
        document.getElementById("signupMessage").textContent = "Please fill out all fields.";
    }
  });  

/* Clinician Login Form */
clinicianLoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validate against our demo credentials
    if (email === CLINICIAN_EMAIL && password === PASSWORD) {
        localStorage.setItem("email", email);
        
        // Successful login simulation
        errorMessage.textContent = ""; // Clear any previous error
        window.location.href = "clinicianDashboard.html"; // Redirect to a "dashboard" page
    } else {
        // Show error message
        errorMessage.textContent = "Invalid email or password.";
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
