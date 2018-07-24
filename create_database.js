const db = require('./db')

class Setup {
    static createEmployee(){
        let query = `CREATE TABLE IF NOT EXISTS Employees (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     username VARCHAR,
                     password VARCHAR,
                     position VARCHAR,
                     status INTEGER)`

        db.run(query, function(err) {
            if(err) throw err;
            console.log(`sukses`);  
        })
    }

    static createPatient(){
        let query = `CREATE TABLE IF NOT EXISTS Patients (
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR,
                     diagnosis VARCHAR)`

        db.run(query, function(err) {
            if (err) throw err;
            console.log(`sukses`);
        })
    }
}

Setup.createEmployee()
Setup.createPatient()