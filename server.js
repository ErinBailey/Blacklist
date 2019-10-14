const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const { join } = require("path");
const jsonParser = bodyParser.json()
var git = require("./adapters/git");
var db = require("./adapters/db/db");
const port =  process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.get("/blacklist", jsonParser, (req, res) => { // gets the blacklist from the DB
  db.getBlacklist();
  res.status(200);
  res.send(res.body);
});

// on start, if blacklist directory does not exist we clone the repo and insert into DB
app.listen(port, () => {
  console.log("Express server listening on port", port)
  git.initialClone();
});

module.exports = app;