const fs = require("fs");
const { Client } = require('pg')
const client = new Client({
    database: 'blacklist',
})
client.connect()

exports.initialInsert = function() {
    // if (fs.existsSync("./blacklist")){
    //     var files = []
    //     fs.readdir('./blacklist', function(err, items) {
    //         for (var i=1; i<items.length; i++) {
    //             files.push(items[i])
    //         }
    //     });
        // for (var j = 0; j < files.length; j++) {
            var IPs = fs.readFileSync(`./blacklist/anonymous.netset`).toString().split("\n");
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
        // }
    // }
}


exports.checkInvalidIP = function(ip, callback) {
    for (i = 1; i < 37; i++) { // hard coded number. how the heck do I do a simple query without callback craziness??
        var inner_query = `SELECT addressINET from ipAddresses where id=${i}`
        var isInvalidQuery = `SELECT INET '${ip}' = '${inner_query}' OR INET '${ip}' <<= '${inner_query}';` // TODO for loop this sample for trying to return true to the response body for /ip-invalid
        client.query(isInvalidQuery, (err, res) => {
            if (err) {
                console.log(err.stack)
                callback("Failure querying IP directly")
                return
            }
            if (res.rows[0]['?column?']) {
                callback(res.rows[0]['?column?']);
            } else {
                console.log("not true")
            }
        });
    }
    // select inet '62.73.9.254' <<= '62.73.8.0/23'; // (is within the range)
    // select inet '62.73.9.254' = '62.73.9.254'; // (is equal)
    // some kind of truthy table  about if it returns true it IS a bad IP
    // sort the IPs? and then do a check if it's greater than the largest and less than the smallest and if so then don't bother
    // else run through it somehow
}