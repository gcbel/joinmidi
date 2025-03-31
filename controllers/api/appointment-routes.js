/* DEPENDENCIES */
const router = require("express").Router();
const { Op } = require("sequelize");
const { User, Appointment } = require("../../models");

/* GET all past completed appointments for the person */
router.get("/past", async (req, res) => {
  try {
    // Use current time in ISO format for comparison (assuming appointment.date is stored as ISO string)
    const now = new Date().toISOString();
    const pastAppointments = await Appointment.findAll({
      where: {
        user_id: req.session.user_id,
        completed: true,
      },
    });
    res.status(200).json(pastAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve past appointments." });
  }
});

/* GET all past completed appointments for the person */
router.get("/missed", async (req, res) => {
  try {
    // Use current time in ISO format for comparison (assuming appointment.date is stored as ISO string)
    const now = new Date().toISOString();
    const pastAppointments = await Appointment.findAll({
      where: {
        user_id: req.session.user_id,
        completed: false,
        date: {
          [Op.lt]: now, // appointments scheduled before now
        },
      },
    });
    res.status(200).json(pastAppointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve past appointments." });
  }
});

/* GET all non-completed (upcoming) appointments for the person */
router.get("/upcoming", async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ message: "Unauthorized: User not logged in." });
    }
    const upcomingAppointments = await Appointment.findAll({
      where: {
        user_id: req.session.user_id,
        completed: false,
        date: { [Op.gte]: new Date().toISOString() },
      },
    });
    console.log("Upcoming appointments:", upcomingAppointments);
    res.status(200).json(upcomingAppointments);
  } catch (err) {
    console.error("Error retrieving upcoming appointments:", err);
    res.status(500).json({ message: "Failed to retrieve upcoming appointments." });
  }
});


/* Complete an appointment (mark as complete) */
router.put("/complete/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    appointment.completed = true;
    await appointment.save();
    res.status(200).json({ message: "Appointment marked as complete." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to complete appointment." });
  }
});

/* Delete an appointment */
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await Appointment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedCount) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    res.status(200).json({ message: "Appointment deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete appointment." });
  }
});

/* Book an appointment */
router.post("/book", async (req, res) => {
  try {
    const appointmentDate = new Date();
    appointmentDate.setDate(appointmentDate.getDate() + 1);
    const isoDate = appointmentDate.toISOString();

    if (!isoDate) {
      return res.status(400).json({ message: "Appointment date is required." });
    }
    // Create a new appointment (additional fields can be added as needed)
    const appointment = await Appointment.create({
      user_id: req.session.user_id,
      date: isoDate,
      completed: false,
    });
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to book appointment." });
  }
});

/* EXPORTS */
module.exports = router;
