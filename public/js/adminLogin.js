/* VARIABLES */
var clinicianLoginSection = document.getElementById("clinician-login");
var adminLoginSection = document.getElementById("admin-login");

const clinicianLoginForm = document.getElementById("clinicianLoginForm");
const adminLoginForm = document.getElementById("adminLoginForm");

const clinicianLoginMessage = document.getElementById("clinician-login-message");
const adminLoginMessage = document.getElementById("admin-login-message");

ADMIN_EMAIL = "admin@gmail.com"
CLINICIAN_EMAIL = "clinician@gmail.com"
PASSWORD = "password"

/* FUNCTIONS */
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

/* EVENT LISTENERS */
clinicianLoginForm.addEventListener("submit", clinicianLogin);
adminLoginForm.addEventListener("submit", adminLogin);

/* Show/Hide login divs */
document.getElementById("book-now").addEventListener("click", function () {
    window.location.href = "login"
});

document.getElementById("clinician-login-button").addEventListener("click", function () {
    if (
        clinicianLoginSection.style.display === "none" ||
        clinicianLoginSection.style.display === ""
    ) {
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
        clinicianLoginSection.style.display = "none";
        adminLoginSection.style.display = "block";
    } else {
        adminLoginSection.style.display = "none";
    }
});