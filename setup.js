const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db')

function createTables() {
    db.serialize(function () {
        db.run(`CREATE TABLE IF NOT EXISTS Employees
                (id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name VARCHAR(100), 
                username VARCHAR(50), password VARCHAR(50), 
                position TEXT, loginstatus INTEGER)`);

        db.run(`CREATE TABLE IF NOT EXISTS Patients
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100), diagnosis TEXT)`);
    });
}

createTables();