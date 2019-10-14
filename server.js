const express = require("express");
const app = express();
const { join } = require("path");
var git = require("./adapters/git");
const port =  process.env.PORT || 3000;

app.use(express.static(join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/sample-ip-event", (req, res) => {
  console.log("Webhook indicating a change in the repo has occurred")
  res.status(200);
  res.send(req.body);
});

// on start, if blacklist directory does not exist we clone the repo and insert into DB
app.listen(port, () => {
  console.log("Express server listening on port", port)
  git.initialClone();
});

module.exports = app;