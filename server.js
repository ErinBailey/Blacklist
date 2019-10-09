const express = require("express");
const { join } = require("path");
const app = express();
const WebhooksApi = require('@octokit/webhooks')

const webhooks = new WebhooksApi({
  secret: process.env.GITHUB_WEBHOOK_SECRET || 'mysecret'
})

app.use(express.static(join(__dirname, "public")));
app.use(WebhooksApi);

webhooks.on('*', ({id, name, payload}) => {
  console.log("payload ###: ", payload)
  console.log("name ###: ", name)
})

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
  var headers = req.headers
  console.log("headers!!!!", headers)
  console.log("message!!!!", message)
  res.status(200);
  res.send(req.body);
});

const port =  process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Express server listening on port', port)
});

module.exports = app;
