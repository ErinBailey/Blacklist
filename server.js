const express = require("express");
const { join } = require("path");
const app = express();
// var createHandler = require('github-webhook-handler')
// var handler = createHandler({ path: '/webhook', secret: 'secret123321'});

app.use(express.static(join(__dirname, "public")));
// app.use(createHandler);

// handler.on('error', function (err) {
//   console.error('Error:', err.message)
// })

// handler.on('push', function (event) {
//   console.log('Received a push event for %s to %s',
//     event.payload.repository.name,
//     event.payload.ref)
// })

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
