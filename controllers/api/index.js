// Import Required Packages
const router = require("express").Router();

// Import Required Files
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

// Prefix Grouped Endpoints with Specific Paths
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;
