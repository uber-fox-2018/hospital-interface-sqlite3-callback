const sqlite3  = require('sqlite3').verbose();
const db       = new sqlite3.Database('./hospital.db');
//create employees table
let createTableEmployees = "CREATE TABLE IF NOT EXISTS employees (ID INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(10), password VARCHAR(20), role VARCHAR(20), isLogin VARCHAR(5) DEFAULT 'false')";
let createTablePatients = "CREATE TABLE IF NOT EXISTS patients (ID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(10), diagnoses TEXT)";

db.serialize(()=>{
    db.run(createTableEmployees);
})

db.serialize(()=>{
    db.run(createTablePatients);
})
module.exports = db;