/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const userRoutes = require("./user-routes.js");
const appointmentRoutes = require("./appointment-routes.js");

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);

/* EXPORTS */
module.exports = router;
