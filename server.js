const express = require("express");
const app = express();
const { join } = require("path");
var git = require("./adapters/git");
var db = require("./adapters/db/db");
var bodyParser = require("body-parser");
const port =  process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/sample-ip-event", (req, res) => {
  // Need ngrok tunnel for public IP while running locally. Stick the address in the github webhook settings for Sample-IPs
  console.log("Webhook indicating a change in the repo has occurred")
  res.status(200);
  res.send();
});

app.post("/ip-invalid", (req, res) => {
  var ip = req.body.ip
  var result = db.checkInvalidIP(ip)
  console.log("result 4", result)
  res.status(200);
  res.send(result) // this should be true or false
});

// on start, if blacklist directory does not exist we clone the repo and insert into DB
app.listen(port, () => {
  console.log("Express server listening on port", port)
  git.initialClone();
});

module.exports = app;