/* VARIABLES */
const greeting = document.getElementById("greeting");

/* FUNCTIONS */
function greet() {
    fetch('/api/users/session')
    .then(response => response.json())
    .then(sessionData => {
        greeting.textContent.textContent = `Hello, ${sessionData.first_name}!`;
    })
    .catch(err => {
        console.error("Error fetching session data:", err);
    });
}

/* EVENT LISTENERS */
greet();