var Git = require("nodegit");
const fs = require("fs");
const db = require("./db/db");

exports.initialClone = function() {
    if (!fs.existsSync("./blacklist")) {
        console.log("Cloning repo")
        Git.Clone("https://github.com/ErinBailey/Sample-IPs", "./blacklist")
      }
    console.log("IPs are up to date")
}