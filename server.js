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
  // run `ngrok http 3000` WHILE running `npm start` in another terminal
  console.log("Webhook indicating a change in the repo has occurred")
  git.ipUpdateList()
  res.status(200);
  res.send();
});

app.post("/ip-invalid", (req, res) => {
  var ip = req.body.ip
  db.checkInvalidIP(ip, function(isInvalid){
    res.send(isInvalid) 
  })
  res.status(200);
});

// on start, if blacklist directory does not exist we clone the repo and insert into DB
app.listen(port, () => {
  console.log("Express server listening on port", port)
  git.initialClone();
});

module.exports = app;