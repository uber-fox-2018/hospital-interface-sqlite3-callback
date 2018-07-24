const db = require('../db')

class Employee {
   
    static register (username, password, role, callback) {
        let queryRegister = `INSERT INTO Employees (username, password, role)
                             VALUES ("${username}", "${password}", "${role}")`
        let queryTotal = `SELECT COUNT(id) AS totalEmployee FROM Employees` 

        db.run(queryRegister, (err) => {
            if (err) {
                callback(err)
            }else {
                db.get(queryTotal, (err, data) => {
                    if(err) {
                        callback(err, null)
                    }else {
                        let obj = {
                            username: username,
                            password: password,
                            role: role
                        }
                        let dataRegister = {employee: obj, totalEmployee: data.totalEmployee}
                        callback(null, dataRegister)
                    }
                })
            }
        })
    }

    static login (username, password, callback) {
        let queryLogin = `SELECT username, password FROM Employees 
                          WHERE username = "${username}" AND password = "${password}"`
        let queryCheck = `SELECT * FROM EMployees WHERE login = "On"`
        let queryUpdate = `UPDATE Employees SET login = "On" WHERE username = "${username}"`

        db.get(queryCheck, (err, statusLogin) => {
            if(err) {
                callback(err, null)
            }else {
              if(statusLogin) {
                  let err = { message: 'already logged in' }
                  callback(err, null)
              }else {
                  db.get(queryLogin, (err, checkUser) => {
                      if(err) {
                          callback(err, null)
                      }else {
                          if(!checkUser) {
                            let err = { message: `username / password wrong` }
                              callback(err, null)
                          }else {
                              db.run(queryUpdate, (err) => {
                                  if(err) throw err;
                                  
                              })
                          }
                      }
                  })
              }
            }
            callback(null, null)
        })
    }

    static logout(username, callback) {
        let queryUpdate = `UPDATE Employees SET login = "Off" WHERE username = "${username}"`

        db.run(queryUpdate, (err) => {
            if(err) throw err;
        })
        callback(null, null)
    }
}

module.exports = Employee;