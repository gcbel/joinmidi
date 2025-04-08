/* DEPENDENCIES */
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config({ path: "./../../.env" });

/* ROUTES */
// router.post("/account_opened", async (req, res) => {
//   // Extract data from req.body
//   const { email, first_name } = req.body;
  
//   const eventData = {
//     event_name: "account_opened",
//     data: {
//       first_name,
//       email
//     }
//   };

//   try {
//     const eventResponse = await sendEvent(eventData);
//     res.status(200).json({ message: "Account opened event sent.", data: eventResponse });
//   } catch (err) {
//     res.status(500).json({ message: `Failed to send account opened event: ${err}` });
//   }
// });

router.post("/appointment_scheduled", async (req, res) => {
  // Extract data
  const { email, first_name } = req.body;

  const eventData = {
    event_name: "appointment_scheduled",
    data: {
      first_name,
      email
    }
  };

  try {
    const eventResponse = await sendEvent(eventData);
    res.status(200).json({ message: "Appointment scheduled event sent.", data: eventResponse });
  } catch (err) {
    res.status(500).json({ message: `Failed to send appointment scheduled event: ${err}` });
  }
});

router.post("/appointment_completed", async (req, res) => {
  // Extract data
  const { email, first_name } = req.body;

  const eventData = {
    event_name: "appointment_completed",
    data: {
      first_name,
      email
    }
  };

  try {
    const eventResponse = await sendEvent(eventData);
    res.status(200).json({ message: "Appointment completed event sent.", data: eventResponse });
  } catch (err) {
    res.status(500).json({ message: `Failed to send appointment completed event: ${err}` });
  }
});

/* EVENTS */
async function sendEvent(eventData) {
  try {
    const response = await axios.post(
      "https://api.extole.com/v5/events",
      eventData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.EXTOLE_ACCESS_KEY}`
        }
      }
    );
    console.log("Event sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending event:", error.response ? error.response.data : error.message);
    throw error;
  }
}

/* EXPORTS */
module.exports = router;