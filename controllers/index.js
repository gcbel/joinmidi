/* DEPENDENCIES */
const router = require("express").Router();

/* ROUTES */
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

/* EXPORTS */
module.exports = router;
