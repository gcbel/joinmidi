/* VARIABLES */
var patientLoginSection = document.getElementById("patient-login");
var patientSignupSection = document.getElementById("patient-signup");

const patientLoginForm = document.getElementById("patientLoginForm");
const patientSignupForm = document.getElementById("patientSignupForm");

const patientLoginMessage = document.getElementById("patient-login-message");
const signupMessage = document.getElementById("signup-message");

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
    console.log("Account creation sending to Extole with data:", email, firstName)
    (function(c,b,f,k,a){c[b]=c[b]||{};for(c[b].q=c[b].q||[];a<k.length;)f(k[a++],c[b])})(window,"extole",function (c,b){b[c]=b[c]||function (){b.q.push([c,arguments])}},["createZone"],0);
    extole.createZone({
        name: "account_created",
        data: {
            "email": email,
            "first_name": firstName,
        }
    });
}

/* EVENT LISTENERS */
patientLoginForm.addEventListener("submit", patientLogin);
patientSignupForm.addEventListener("submit", patientSignup);

/* Show/Hide login divs */
document.getElementById("toggle-login").addEventListener("click", function () {
    patientSignupSection.style.display = "none";
    patientLoginSection.style.display = "block"
});

document.getElementById("toggle-signup").addEventListener("click", function () {
    patientLoginSection.style.display = "none";
    patientSignupSection.style.display = "block"
});