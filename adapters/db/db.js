const fs = require("fs");
const { Client } = require('pg')
const client = new Client({
    database: 'blacklist',
})
client.connect()

exports.initialInsert = function() {
    // make this multi-file firendly. Instead of a single file, loop through the directory and do this
    if (fs.existsSync("./blacklist/anonymous.netset")){
        var IPs = fs.readFileSync("./blacklist/anonymous.netset").toString().split("\n");
        for(i in IPs) {
            var IP = []
            IP.push(IPs[i])
            const queryInsert = `INSERT INTO ipaddresses (addressINET) VALUES(CAST($1 AS INET));`
            client.query(queryInsert, IP, (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
            })
        }
    }
}

exports.checkInvalidIP = function(ip, callback) {
    var ipArray = []
    ipArray.push(ip)
    var isInvalidQuery = `SELECT INET '62.73.9.254' = '62.73.9.254';` // sample for trying to return true to the response body for /ip-invalid
    
    client.query(isInvalidQuery, (err, res) => {
        if (err) {
            callback(err)
        }
        callback(res.rows[0]['?column?']);
    });
    // select inet '62.73.9.254' <<= '62.73.8.0/23'; // (is within the range)
    // select inet '62.73.9.254' = '62.73.9.254'; // (is equal)
    // some kind of truthy table  about if it returns true it IS a bad IP
    // sort the IPs? and then do a check if it's greater than the largest and less than the smallest and if so then don't bother
    // else run through it somehow
}