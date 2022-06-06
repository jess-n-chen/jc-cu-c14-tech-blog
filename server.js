// Import Express
const express = require("express");
// Import Routes
const routes = require("./controllers");
//Import Path Package
const path = require("path");
// Import Sequelize
const sequelize = require("./config/connection");

// Express Server Config
const app = express();
const PORT = process.env.PORT || 3001;

// Express Server Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
