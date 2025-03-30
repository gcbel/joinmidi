/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const homeRoutes = require("./home-routes.js");
const authRoutes = require("./auth-routes.js");
const apiRoutes = require("./api");

router.use("/auth", authRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);

/* EXPORTS */
module.exports = router;
