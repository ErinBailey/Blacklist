const fs = require("fs");
const { Client } = require('pg')
const client = new Client({
    database: 'blacklist',
})
// do a connection pool

exports.initialInsert = function() {
    // client.connect()
    if (fs.existsSync("./blacklist/anonymous.netset")){
        var IPs = fs.readFileSync("./blacklist/anonymous.netset").toString().split("\n");
        for(i in IPs) {
            var IP = []
            IP.push(IPs[i])
            console.log("IP", IP)
            const queryInsert = `INSERT INTO ipaddresses (addressCIDR, addressINET) VALUES(CAST($1 AS CIDR), CAST($1 AS INET));`
            client.query(queryInsert, IP, (err, res) => {
                if (err) {
                    console.log(err.stack)
                }
            })
        }
        // client.end()
    }
}

exports.getBlacklist = function() {
    // client.connect()
    client.query('SELECT * from ipAddresses', (err, res) => {
        console.log(err ? err.stack : res.rows) // Hello World!
    })
    // client.end()
}