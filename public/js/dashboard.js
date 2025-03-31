/* VARIABLES */
const bookButton = document.getElementById("book-a-visit");
const completeButton = document.getElementById("complete-visit");

/* FUNCTIONS */
async function fetchAppointments() {
  try {
    const [upcomingRes, pastRes] = await Promise.all([
      fetch('/api/appointments/upcoming'),
      fetch('/api/appointments/past')
    ]);
    const upcomingAppointments = await upcomingRes.json();
    const pastAppointments = await pastRes.json();
    renderAppointments(upcomingAppointments, pastAppointments);
  } catch (err) {
    console.error("Error fetching appointments:", err);
  }
}

function renderAppointments(upcoming, past) {
  const upcomingDiv = document.getElementById("upcoming-appointments");
  const pastDiv = document.getElementById("past-appointments");

  // Clear existing content
  upcomingDiv.innerHTML = "";
  pastDiv.innerHTML = "";

  // Render upcoming appointments
  if (upcoming.length === 0) {
    completeButton.style.display = "none";
    bookButton.style.display = "inline-block";
    upcomingDiv.innerHTML = "<p>No upcoming appointments.</p>";
  } else {
    bookButton.style.display = "none";
    completeButton.style.display = "inline-block";
    upcoming.forEach(appt => {
      const apptEl = document.createElement("div");
      apptEl.classList.add("appointment");
      apptEl.textContent = `Appointment on ${new Date(appt.date).toLocaleString()}`;
      upcomingDiv.appendChild(apptEl);
    });
  }

  // Render past (completed) appointments
  if (past.length === 0) {
    pastDiv.innerHTML = "<p>No past appointments.</p>";
  } else {
    past.forEach(appt => {
      const apptEl = document.createElement("div");
      apptEl.classList.add("appointment");
      apptEl.textContent = `Completed on ${new Date(appt.date).toLocaleString()}`;
      pastDiv.appendChild(apptEl);
    });
  }
}

// Function to book a new appointment
async function bookAppointment() {
  try {
    // For demo: book an appointment with the current date/time.
    // You might want to allow the user to pick a date/time.
    const date = new Date().toISOString();
    const response = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date })
    });
    if (response.ok) {
      console.log("Appointment booked successfully.");
      fetchAppointments(); // Refresh appointments
    } else {
      console.error("Failed to book appointment.");
    }
  } catch (err) {
    console.error("Error booking appointment:", err);
  }
}

// Function to mark an appointment as complete
async function completeAppointment(appointmentId) {
  try {
    const response = await fetch(`/api/appointments/complete/${appointmentId}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      console.log("Appointment completed successfully.");
      fetchAppointments(); // Refresh appointments
    } else {
      console.error("Failed to complete appointment.");
    }
  } catch (err) {
    console.error("Error completing appointment:", err);
  }
}

/* EVENT LISTENERS */
bookButton.addEventListener("click", async function () {
  // Book a new appointment, then update button visibility
  await bookAppointment();
  bookButton.style.display = "none";
  completeButton.style.display = "inline-block";
});

completeButton.addEventListener("click", async function () {
  // For demonstration, complete the first upcoming appointment if it exists
  try {
    const res = await fetch('/api/appointments/upcoming');
    const upcomingAppointments = await res.json();
    if (upcomingAppointments.length > 0) {
      const firstAppointmentId = upcomingAppointments[0].id;
      await completeAppointment(firstAppointmentId);
      completeButton.style.display = "none";
      bookButton.style.display = "inline-block";
    } else {
      console.log("No upcoming appointments to complete.");
    }
  } catch (err) {
    console.error(err);
  }
});

/* Fetch and render appointments when the page loads */
fetchAppointments();