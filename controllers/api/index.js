/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const userRoutes = require("./user-routes.js");
const contentRoutes = require("./content-routes.js");

router.use("/users", userRoutes);
router.use("/content", contentRoutes);

/* EXPORTS */
module.exports = router;
