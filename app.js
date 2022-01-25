const express = require("express");
const res = require("express/lib/response");
require("dotenv").config();
const app = express();
const port = process.env.DEFAULT_PORT || 3000;

//!MIDDLEWARES
app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`SERVER LISTEN ON PORT ${port}`);
});
app.on("error", (err) => {
  console.error(`THERE WAS AN ERROR: ${err}`);
});
