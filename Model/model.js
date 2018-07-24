const db = require('../databaseHospital.js')


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(username, password, role) {
    this.username = username
    this.password = password
    this.role = role
  }
}

class Model {
  static readData(query, callback) {
    db.all(query, (err, data) => {
      (!err) ? callback(data) : callback(err);
    })
  }

  static writeData(query, callback) {
    db.run(query, (err) => {
      (err) ? callback(err + '\n' + 'Failed to Write Data!') : callback('Success To updated database!');
    })
  }

  static registerEmployee(username, password, role, callback) {
    let newEmpolyee = new Employee(username, password, role)
    let query = `INSERT INTO Employees(username, password, role, isOnline)
                  VALUES ("${newEmpolyee.username}", ${newEmpolyee.password}, "${newEmpolyee.role}", 0)`
    this.writeData(query, (err) => {
      let queryCountEmployees = `SELECT COUNT(*) AS totalData FROM Employees`
      callback(null, err)
      this.readData(queryCountEmployees, (lengthData) => {
        let msg = `save data success ${JSON.stringify(newEmpolyee)}. Total employees: ${lengthData[0].totalData}`
        callback(msg, null)
      })
    })
  }

  static loginEmployee(username, password, callback) {
    let query = `SELECT * FROM Employees`
    db.each(query, (err, rowData) => {
      if (err) throw err
      if(rowData.username === username && rowData.password === Number(password) && rowData.isOnline === 0) {
        let updateQuery = `UPDATE Employees SET isOnline = 1 WHERE username = "${username}" AND password = ${password}`
        this.writeData(updateQuery, (msg) => {
          callback(`username ${username} is logged in successfully`)
        })
      } else if(rowData.username === username && rowData.password === Number(password) && rowData.isOnline !== 0) {
        callback(`username ${username} already logged in`)
      }
    }) 
  }

  static logoutEmployee(username, callback) {
    let query = `SELECT * FROM Employees`
    db.each(query, (err, rowData) => {
      if(err) throw err
      if(rowData.username === username && rowData.isOnline === 1) {
        let updatedQuery = `UPDATE Employees SET isOnline = 0 WHERE username = "${username}"`
        this.writeData(updatedQuery, (msg) => {
          callback(`username ${username} has been logged out`)
        })
      } else if(rowData.username === username && rowData.isOnline === 0) {
        callback(`username ${username} Already logged out`)
      }
    })
  }

  static addPatient(namePatient, diagnosis, callback) {
    let query = `SELECT * FROM Employees`
    let count = 0
    db.each(query, (err, rowData) => {
      if(err) throw err
      if(rowData.role === 'dokter' && rowData.isOnline === 1) {
        let insertQuery = `INSERT INTO Patients (name, diagnosis) VALUES ("${namePatient}", "${diagnosis}")`
        this.writeData(insertQuery, (msg) => {
          let queryCountData = `SELECT COUNT(*) AS length FROM Patients`
          this.readData(queryCountData, (msg) => {
            callback(`Data patient successfully to added. Total data patient : ${msg[0].length}`)
          })
        })
      } else if(count === 0){
        callback(`tidak memiliki akses untuk add patient`)
        count++
      }
    })
  }
}


module.exports = Model