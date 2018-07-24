//your code here
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./hospital.db");

function createTable() {
  db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS Employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR (20),
          password VARCHAR (20),
          position VARCHAR (20),
          login INTEGER DEFAULT 0 ) `);

    db.run(`CREATE TABLE IF NOT EXISTS Patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR (20),
            diagnosis VARCHAR (100)) `);
  });
}

createTable();

module.exports = db;
