var Git = require("nodegit");
const fs = require("fs");
const db = require("./db/db");

exports.initialClone = function() {
    var promise = new Promise(function(resolve, reject) {
        if (!fs.existsSync("./blacklist")) {
            console.log("Cloning repo")
            resolve(Git.Clone("https://github.com/ErinBailey/Sample-IPs", "./blacklist"))
        }
        console.log("IPs are up to date")
    })
    promise.then(function() {
        console.log("Inserting cloned IPs into DB")
        db.initialInsert();
      });
}