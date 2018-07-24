const sqlite3  = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

//  AUTOMATIC CREATE TABLE
db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, job TEXT, status INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS patients(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, diagnosis TEXT)");
});

module.exports = db;