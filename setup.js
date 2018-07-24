const db = require('./db.js')

const create_table_employee = `CREATE TABLE IF NOT EXISTS Employees (
                                employeeID INTEGER PRIMARY KEY AUTOINCREMENT,
                                username VARCHAR(100),
                                password VARCHAR(20),
                                position VARCHAR(100),
                                isLogin VARCHAR(20))`;
                    
const create_table_patient = `CREATE TABLE IF NOT EXISTS Patients (
                                patientID INTEGER PRIMARY KEY AUTOINCREMENT,
                                patientName VARCHAR(100),
                                diagnosis VARCHSR(100))`;

db.serialize( () => {
    db.run(create_table_employee, function(err) {
        if(err) throw err
        console.log(`sukses create table employee`)
    })

    db.run(create_table_patient, function(err) {
        if (err) throw err
        console.log( `sukes create table patient`)
    })
})