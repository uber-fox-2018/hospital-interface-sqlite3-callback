const db = require('./db')

let createEmployees = `
CREATE TABLE IF NOT EXISTS employees(
id INTEGER PRIMARY KEY AUTOINCREMENT,
position VARCHAR,
username VARCHAR,
password VARCHAR,
loginstatus INTEGER
)
`


let createPatients = `
CREATE TABLE IF NOT EXISTS patients(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name VARCHAR,
diagnosis TEXT
)
`



db.run(createPatients, function(err){
    if (err) throw err
    console.log('successfully created table')
})