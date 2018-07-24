const db = require('../db.js')

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.isLogin = false
  }

  static register(username, password, position, callback) {
    let queryRegister = `INSERT INTO Employees (username, password, position, isLogin) 
                          VALUES ("${username}", "${password}", "${position}", "OFF")`
    let employeeData = new Employee(username, password, position)
    db.run(queryRegister, function(err) {
      if (err) throw err
      let queryTotalEmployee = `SELECT COUNT (*) AS totalEmployee FROM Employees`
      db.get(queryTotalEmployee, function(err, data) {
        if (err) {
          callback(err, null)
        } else {
          let result = `save data success ${JSON.stringify(employeeData)} Total Employee = ${data.totalEmployee}`
          callback(null, result)
        }
      })
    })
  }

  static login(username, password, callback) {
    let queryCheck_Online = `SELECT * FROM Employees WHERE isLogin = "ON"`
    let queryCheck_User = `SELECT username, password FROM Employees WHERE username = "${username}" AND password = "${password}"`
    let queryUpdate_Status = `UPDATE Employees SET isLogin = "ON" WHERE username = "${username}"`

    db.get(queryCheck_Online, function(err, statusLogin) {
      if (err) {
        throw err
      } else {
        if (statusLogin) { 
          let err = { msg: `cannot login someone is login`}
          callback(err, null)
        } else {
          db.get(queryCheck_User, function(err,checkUser) {
            if (err) {
              throw err
            } else {
              if (!checkUser) {
                let err = { msg: `username/password invalid`}
                callback(err,null)
              } else {
                db.run(queryUpdate_Status, function(err) {
                  if (err) throw err
                  callback(null,null)
                })
              }
            }
          })
        }
      }
    })
  }  

  static logout(username, callback) {
    let query_log_out = `UPDATE Employees SET isLogin = "OFF" WHERE username = "${username}"`
    db.run(query_log_out, function(err) {
      if (err) throw err
    })
    callback(null, null)
  }
}

module.exports = Employee