// Import Required Packages
const router = require("express").Router();

// Import Required Files
const userRoutes = require("./user-routes");

// Prefix Grouped Endpoints with Specific Paths
router.use("/users", userRoutes);

module.exports = router;
