/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const userRoutes = require("./user-routes.js");
const appointmentRoutes = require("./appointment-routes.js");
const extoleRoutes = require("./extole-routes.js")

router.use("/users", userRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/extole", extoleRoutes)

/* EXPORTS */
module.exports = router;
