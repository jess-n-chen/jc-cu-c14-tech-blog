// Import Express
const express = require("express");
// Import Routes
const routes = require("./controllers");
//Import Path Package
const path = require("path");
// Import Express Session
const session = require("express-session");
// Import Sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// Import Helpers
const helpers = require("./utils/helpers");

// Import Handlebars
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

// Express Server Config
const app = express();
const PORT = process.env.PORT || 3001;

// Session Config
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 12 * 60 * 60 * 1000,
  }),
};
app.use(session(sess));

// Express Server Config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Express Static Config
app.use(express.static(path.join(__dirname, "public")));
// Handlebars Config
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Turn On Routes
app.use(routes);

// Turn On Connection To DB and Server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
