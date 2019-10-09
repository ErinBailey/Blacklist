const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
var bodyParser = require('body-parser')

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "public")));
app.use(bodyParser.json());

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/sample-ip-event", (req, res) => {
  console.log("req.connection.remoteAddress!!!!!", req.connection.remoteAddress) // remote IP
  console.log("request.headers['x-forwarded-for']!!!!!", req.headers['x-forwarded-for']) // remote IP if the server is behind a proxy
  var message = req
  var headers = res.headers
  console.log("message!!!!", message)
  console.log("headers!!!!", headers)
  res.status(200);
  res.send(req.body);
});

process.on("SIGINT", function() {
  process.exit();
});

module.exports = app;
