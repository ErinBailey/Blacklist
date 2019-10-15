var Git = require("nodegit");
const fs = require("fs");
const db = require("./db/db");
const https = require('https');

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

exports.ipUpdateList = function() {
// I can't hit this url locally but I can hit it from postman ¯\_(ツ)_/¯
    console.log("getting the latest commit sha")
    // https.get({
    //     uri: 'https://api.github.com/repos/ErinBailey/Sample-IPs/commits',
    //     headers: {
    //         "User-Agent": "ErinBailey-Blacklist"
    //     },
    //   }, (res) => {
    //     console.log(res.body)
    //   });

// var latestSha = res.body[0].sha
// Get the sha
// Make the same call as above with /sha AND ACCEPT: application/vnd.github.v3.diff as a header
// here is the output:
// diff --git a/anonymous.netset b/anonymous.netset
// index 8bd7895..ae748ac 100644
// --- a/anonymous.netset
// +++ b/anonymous.netset
// @@ -38,3 +38,4 @@
//  103.20.72.24
//  103.11.98.106
//  103.20.8.72
// +99.203.36.181
// parse based off + and -
// insert into DB / delete from DB depending

}