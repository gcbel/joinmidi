/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var patientSignupSection = document.getElementById("patient-signup");
var clinicianLoginSection = document.getElementById("clinician-login");
var adminLoginSection = document.getElementById("admin-login");

const patientLoginForm = document.getElementById("patientLoginForm");
const patientSignupForm = document.getElementById("patientSignupForm");
const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const adminLoginForm = document.getElementById("adminLoginForm");

const patientLoginMessage = document.getElementById("patient-login-message");
const signupMessage = document.getElementById("signup-message");
const clinicianLoginMessage = document.getElementById("clinician-login-message");
const adminLoginMessage = document.getElementById("admin-login-message");

ADMIN_EMAIL = "admin@gmail.com"
CLINICIAN_EMAIL = "clinician@gmail.com"
PASSWORD = "password"

/* FUNCTIONS */
/* Patient Login Form */
const patientLogin = async (event) => {
    event.preventDefault(); // Prevent the from refreshing the page

    const email = document.getElementById("patient-login-email").value;
    const password = document.getElementById("patient-login-password").value;
    const errorMessage = document.getElementById("patient-login-error-message");
    const existingEmail = await isExistingEmail(email);

    if (email && password) {
        if (email === CLINICIAN_EMAIL && password === PASSWORD) {
            errorMessage.textContent = "Please navigate to the clinician login.";
        } else if (email === ADMIN_EMAIL && password === PASSWORD) {
            errorMessage.textContent = "Please navigate to the admin login.";
        } else if (existingEmail) {
            try {
                const response = await fetch("/api/users/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                
                if (response.ok) {
                    errorMessage.textContent = "";
                    window.location.href = "dashboard.html"; // Redirect to patient dashboard
                } else {
                    errorMessage.textContent = "Invalid email or password.";
                }
            } catch (err) {
                console.error("Login error:", err);
                errorMessage.textContent = "This email and password combination doesn't match our records. Please try again.";
            }
        } else {
            errorMessage.textContent = "This email and password combination doesn't match our records. Please try again.";
        }
    } else {
        errorMessage.textContent = "Please fill out all fields.";
    }
};

/* Patient Signup Form */
const patientSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Get form field values
    const firstName = document.getElementById("patient-signup-name").value;
    const email = document.getElementById("patient-signup-email").value;
    const password = document.getElementById("patient-signup-password").value;
    const errorMessage = document.getElementById("patient-signup-error-message");
    const validEmail = isValidEmail(email);
    const existingEmail = await isExistingEmail(email);
  
    if (firstName && email && password) {
        if (email === CLINICIAN_EMAIL && password === PASSWORD) {
            errorMessage.textContent = "Please navigate to the clinician login.";
        } else if (email === ADMIN_EMAIL && password === PASSWORD) {
            errorMessage.textContent = "Please navigate to the admin login.";
        } else if (validEmail && !existingEmail) {
            try {
                const response = await fetch("/api/users/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstName, email, password }),
                });
        
                if (response.ok) {
                    errorMessage.textContent = ""
                    sendAccountOpened(email, firstName)      // Send info to Extole
                    window.location.href = "dashboard.html"; // Redirect to patient dashboard
                } else {
                    errorMessage.textContent = "Signup failed. Please try again.";
                }
            } catch (err) {
                console.error("Signup error:", err);
                errorMessage.textContent = "Signup failed. Please try again.";
            }
        } else {
            errorMessage.textContent = "This email is either already in use or is invalid.";
        }
    } else {
        errorMessage.textContent = "Please fill out all fields.";
    }
};  

/* Clinician Login Form */
const clinicianLogin = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the input values
    const email = document.getElementById("clinician-login-email").value;
    const password = document.getElementById("clinician-login-password").value;
    const errorMessage = document.getElementById("clinician-login-error-message");

    // Validate against our demo credentials
    if (email && password) {
        if (email === CLINICIAN_EMAIL && password === CLINICIAN_PASSWORD) {
            try {
                const response = await fetch("/api/users/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                
                if (response.ok) {
                    errorMessage.textContent = "";
                    window.location.href = "clinician.html"; // Redirect to clinician dashboard
                } else {
                errorMessage.textContent = "Invalid email or password.";
                }
            } catch (err) {
                console.error("Login error:", err);
                errorMessage.textContent = "An error occurred. Please try again later.";
            }
        } else {
            errorMessage.textContent = "This email and password combination doesn't match our records. Please try again.";
        }
    } else {
        errorMessage.textContent = "Please fill out all fields.";
    }
};

/* Admin Login Form */
const adminLogin = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get the input values
    const email = document.getElementById("admin-login-email").value;
    const password = document.getElementById("admin-login-password").value;
    const errorMessage = document.getElementById("admin-login-error-message");

    // Validate against our demo credentials
    if (email && password) {
        if (email === ADMIN_EMAIL && password === PASSWORD) {
            try {
                const response = await fetch("/api/users/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                
                if (response.ok) {
                    errorMessage.textContent = "";
                    window.location.href = "admin.html"; // Redirect to admin dashboard
                } else {
                errorMessage.textContent = "Invalid email or password.";
                }
            } catch (err) {
                console.error("Login error:", err);
                errorMessage.textContent = "An error occurred. Please try again later.";
            }
        } else {
            errorMessage.textContent = "This email and password combination doesn't match our records. Please try again.";
        }
    } else {
        errorMessage.textContent = "Please fill out all fields.";
    }
};

/* Checks if email exists in database */
async function isExistingEmail(email) {
    try {
        const response = await fetch(`/api/users/check-email/${email}`);
        if (response.ok) {
            const { exists } = await response.json();
            return exists;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

/* Checks for a valid email */
function isValidEmail(email) {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
}

/* EXTOLE ACCOUNT OPENED FUNCTIION */
async function sendAccountOpened(email, firstName) {
    try {
        const response = await fetch('/api/extole/account_opened', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            email: email,
            first_name: firstName
            })
        });
    
        if (!response.ok) {
            throw new Error(`Extole server error: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Account opened event sent:", data);
        return data;
    } catch (err) {
        console.error("Error sending account opened event:", err);
    }
}

/* EVENT LISTENERS */
patientLoginForm.addEventListener("submit", patientLogin);
patientSignupForm.addEventListener("submit", patientSignup);
clinicianLoginForm.addEventListener("submit", clinicianLogin);
adminLoginForm.addEventListener("submit", adminLogin);

/* Show/Hide login divs */
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
        adminLoginSection.style.display = "none";
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
        adminLoginSection.style.display = "none";
        clinicianLoginSection.style.display = "block";
    } else {
        clinicianLoginSection.style.display = "none";
    }
});

document.getElementById("admin-login-button").addEventListener("click", function () {
    if (
        adminLoginSection.style.display === "none" ||
        adminLoginSection.style.display === ""
    ) {
        patientSignupSection.style.display = "none"
        patientLoginSection.style.display = "none";
        clinicianLoginSection.style.display = "none";
        adminLoginSection.style.display = "block";
    } else {
        adminLoginSection.style.display = "none";
    }
});