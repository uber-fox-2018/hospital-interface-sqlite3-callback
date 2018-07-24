var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./hospital.db')

let queryTableEmployee = `CREATE TABLE IF NOT EXISTS employees (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(50),
                          password VARCHAR(50), name VARCHAR(50), role VARCHAR(50), date VARCHAR(20), status INTEGER DEFAULT 0)`

let queryTablePatient  = `CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50), 
                          last_name VARCHAR(50), gender VARCHAR(10), diagnosis VARCHAR(50), date VARCHAR(20))`

db.serialize(function() {
    db.run(queryTableEmployee)
    db.run(queryTablePatient)
})

module.exports = db