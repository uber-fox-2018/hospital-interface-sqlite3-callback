const db = require('./db.js')

function createTable(){

    db.serialize(function(){

        db.run(`CREATE TABLE IF NOT EXISTS Employee
               (EmployeeId INTEGER PRIMARY KEY AUTOINCREMENT,
                userName VARCHAR,
                password VARCHAR,
                role VARCHAR,
                loginStatus INTEGER)`);
        
        db.run(`CREATE TABLE IF NOT EXISTS Patient
               (patientId INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR,
                diagnosa VARCHAR)`);


    })    
}

createTable()