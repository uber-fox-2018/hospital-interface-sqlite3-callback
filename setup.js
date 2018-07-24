const db = require('./db.js')

class Create {
    static tableEmployee () {
        let query = `CREATE TABLE Employees(
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     username VARCHAR(100),
                     password VARCHAR(100),
                     role VARCHAR(50),
                     login VARCHAR(50) DEFAULT "Off"
                     );`
                     db.run(query, (err) => {
                        if(err) throw err
                     })
    }

    static tablePatient () {
        let query = `CREATE TABLE Patients(
                     id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name VARCHAR(100),
                     diagnosis VARCHAR(200)
                     );`
                     db.run(query, (err) => {
                        if(err) throw err
                     })
    }
}

Create.tableEmployee()
Create.tablePatient()