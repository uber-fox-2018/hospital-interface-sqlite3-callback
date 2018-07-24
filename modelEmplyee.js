var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');
let Model_patient = require('./model.js')

class Employee {
    static createTable() {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS employee 
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR, 
            position VARCHAR, 
            username VARCHAR,
            password VARCHAR,
            loginStatus BOOLEAN );`);
        })
    }
    static createEmployee(name, position, username, password, loginStatus, cb) {

        let query = `INSERT INTO employee (name, position, username, password, loginStatus)
                    VALUES ('${name}','${position}','${username}','${password}','${loginStatus}');`

        db.run(query, () => {
            let totalEmployeeQuery = `SELECT * FROM employee`
            db.all(totalEmployeeQuery, (err, dataEmployee) => {
                cb(dataEmployee)
            })
        })
    }

    static delete(id, name, username) {
        let query = `DELETE FROM employee
                    WHERE id = '${id}';`

        db.run(query, () => { })
    }

    static update(id, name, position, username, password) {
        let query = `UPDATE employee
                    SET name = '${name}',
                    position = '${position}',
                    username = '${username}',
                    password = '${password}' 
                    WHERE id = '${id}'`

        db.run(query, () => { })
    }

    static initData() {
        let dataEmployee = [{ name: 'mahmud', position: 'doctor', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'nunung', position: 'admin', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'ali', position: 'office boy', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'bobon', position: 'receptionist', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'bobi', position: 'doctor', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'cinta', position: 'admin', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'kundi', position: 'office boy', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'sekar', position: 'office boy', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'omon', position: 'admin', username: 'mahmud21', password: 'okok', loginStatus: 'x' },
        { name: 'kumar', position: 'receptionist', username: 'mahmud21', password: 'okok', loginStatus: 'x' }]

        dataEmployee.forEach(data => {
            let query = `INSERT INTO employee (name,position,username,password,loginStatus)
                       VALUES('${data.name}','${data.position}','${data.username}','${data.password}','${data.loginStatus}');`
            db.run(query, () => { })
        });
    }

    static login(username, password, cb) {
        let queryAll = `SELECT username,loginStatus,password FROM employee`
        db.all(queryAll, (err, employeeStatusLogin) => {
            employeeStatusLogin.forEach(element => {
                if (element.username == username && element.password == password) {
                    let statusLogin = 'v'
                    let queryUpdate = `UPDATE employee
                                      SET loginStatus = '${statusLogin}'
                                      WHERE username = '${username}'`
                    db.run(queryUpdate, () => { })
                    cb(`user ${username} logged in successfully`)
                }

                else if (element.username == username && element.password !== password) {
                    cb('username / password wrong')
                }

            });
        })
    }

    static addPatient(name, diagnosis, cb) {
        let addPatientQuery = `SELECT position, loginStatus FROM employee
        WHERE position = "doctor" AND loginStatus = "v"`
        db.get(addPatientQuery, (err, statusLoginDoctor) => {


            if (statusLoginDoctor.loginStatus === 'v' && statusLoginDoctor.position == 'doctor') {
                Model_patient.createPatient(name, diagnosis, (dataPatient) => {
                    cb('data pasien berhasil ditambahkan. Total data pasien : ' + dataPatient.length)

                })
            }
            else {
                cb('tidak memiliki akses untuk add patient')
            }

        })
    }

    static logout(username, cb) {
        let queryAll = `SELECT username,loginStatus FROM employee`
        db.all(queryAll, (err, employeeStatusLogin) => {
            employeeStatusLogin.forEach(element => {
                if (element.username == username) {
                    let statusLogin = 'x'
                    let queryUpdate = `UPDATE employee
                                      SET loginStatus = '${statusLogin}'
                                      WHERE username = '${username}'`
                    db.run(queryUpdate, () => { })
                    cb(`user ${username} logout`)
                }
            });
        })
    }

}


module.exports = Employee