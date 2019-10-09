const express = require("express");
const bodyParser = require("body-parser")
const { join } = require("path");
const app = express();

var jsonParser = bodyParser.json()

app.use(express.static(join(__dirname, "public")));

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/sample-ip-event", jsonParser, (req, res) => {
  console.log("req.connection.remoteAddress!!!!!", req.connection.remoteAddress) // remote IP
  console.log("request.headers['x-forwarded-for']!!!!!", req.headers['x-forwarded-for']) // remote IP if the server is behind a proxy
  var headers = req.headers
  console.log("headers!!!!", headers)
  console.log("request!!!!!", req)
  console.log("requestBody!!!!!", req.body)
  console.log("response!!!!!", res)
  console.log("responseBody!!!!!", res.body)
  res.status(200);
  res.send(res.body);
});

const port =  process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});

module.exports = app;
