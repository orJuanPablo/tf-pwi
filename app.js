const express = require("express");
const res = require("express/lib/response");
require("dotenv").config();
const app = express();
const port = process.env.DEFAULT_PORT || 3000;
const host = process.env.DEFAULT_HOST || "http://localhost";
const hbs = require("hbs");
const path = require("path");

//! MIDDLEWARES
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

//! RUTEO
app.use("/", require("./src/routes/home"));
app.use("/ofertas", require("./src/routes/oferta")); //TODO
app.use("*", require("./src/routes/fourOfour"));

//! HANDLEBARS CONFIG
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));
hbs.registerPartials(path.join(__dirname, "src/views/partials"));

app.listen(port, () => {
  console.log(`SERVER LISTEN AT ${host}:${port}`);
});
app.on("error", (err) => {
  console.error(`THERE WAS AN ERROR: ${err}`);
});
