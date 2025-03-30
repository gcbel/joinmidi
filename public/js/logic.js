/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var patientSignupSection = document.getElementById("patient-signup");
var clinicianLoginSection = document.getElementById("clinician-login");
const patientLoginForm = document.getElementById("patientLoginForm");
const patientSignupForm = document.getElementById("patientSignupForm");
const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const errorMessage = document.getElementById("error-message");

CLINICIAN_EMAIL = "clinician@gmail.com"
CLINICIAN_PASSWORD = "password"

/* FORM SUBMISSIONS */
/* Patient Login Form */
patientLoginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the from refreshing the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            if (response.ok) {
                errorMessage.textContent = "";
                localStorage.setItem("email", email);
                window.location.href = "dashboard.html"; // Redirect to patient dashboard
            } else {
                errorMessage.textContent = "Invalid email or password.";
            }
        } catch (err) {
            console.error("Login error:", err);
            errorMessage.textContent = "An error occurred. Please try again later.";
        }
    }
});

/* Patient Signup Form */
patientSignupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form field values
    var email = document.getElementById("email").value;
    var password = document.getElementById("passwordSignup").value;
  
    if (email && password) {
        try {
            const response = await fetch("/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
      
            if (response.ok) {
                localStorage.setItem("email", email);
                signupMessage.textContent = "Signup successful!";
                window.location.href = "dashboard.html"; // Redirect to patient dashboard
            } else {
                signupMessage.textContent = "Signup failed. Please try again.";
            }
        } catch (err) {
            console.error("Signup error:", err);
            signupMessage.textContent = "Signup failed. Please try again.";
        }
    } else {
        signupMessage.textContent = "Please fill out all fields.";
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
        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            
            if (response.ok) {
                errorMessage.textContent = "";
                localStorage.setItem("email", email);
                window.location.href = "dashboard.html"; // Redirect to patient dashboard
            } else {
            errorMessage.textContent = "Invalid email or password.";
            }
        } catch (err) {
            console.error("Login error:", err);
            errorMessage.textContent = "An error occurred. Please try again later.";
        }
    }
});

/* SHOW/HIDE LOGIN DIVS */
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
