// Import Required Packages
const router = require("express").Router();

// Import Required Files
const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

// Set Route for Other Paths
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

// Prefix API Endpoints with /api Path
router.use("/api", apiRoutes);

// Return 404 Error For Requests to Non-Existent Endpoints
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
