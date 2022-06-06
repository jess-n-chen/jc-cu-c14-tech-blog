// Import Required Packages
const router = require("express").Router();

// Import Required Files
const apiRoutes = require("./api");

// Prefix API Endpoints with /api Path
router.use("/api", apiRoutes);

// Return 404 Error For Requests to Non-Existent Endpoints
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
