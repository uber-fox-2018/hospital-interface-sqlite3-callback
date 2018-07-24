const db = require('./db')

class Employee {

  static register(username,password,position,callback){
    let query_register = `INSERT INTO Employees (username,password,position,status)
                          VALUES ("${username}","${password}","${position}","${0}")`

    db.run(query_register,function(err){
      if (err) {
        callback(err,null)
      }else {
        let employee = {
          username: username,
          password: password,
          position: position
        }
        // console.log(employee);
        // console.log(this.lastID);
        callback(null,`save data success ${JSON.stringify(employee)}. Total employee: ${this.lastID}`)
      }
    })
  }

  static checkIsLogin(callback){
    let query_status = `SELECT * FROM Employees WHERE status = 1`
    db.get(query_status, function(err,dataIsLogin){
        if (err) {
            callback(err,null)
        }else {
            callback(null,dataIsLogin)
        }
    })
  }

  static checkUsernamePassword(username,password,callback){
      let query_check = `SELECT username FROM Employees WHERE username = "${username}" AND password = "${password}"`
      db.get(query_check, function(err,dataUser){
          if (err) {
              callback(err,null)
          }else {
              callback(null,dataUser)
          }
      })
  }

  static login(username,password,callback){
      let query_update_status = `UPDATE Employees SET status = 1 WHERE username = "${username}"`
      Employee.checkIsLogin(function(err,dataIsLogin){
        if (dataIsLogin !== undefined) {
            callback(null,`sedang ad yang login`)
        }else {
            Employee.checkUsernamePassword(username,password,function(err,dataUser){
                if (dataUser === undefined) {
                    callback(null,`username or password invalid`)
                }else{
                    db.run(query_update_status,function(err){
                        if (err) {
                            callback(err,null)
                        }else {
                            callback(null,`user ${dataUser.username} login successfully`)
                        }
                    })
                }
            })
        }
      })
  }

  static logout(username,callback){
    let query_logout = `SELECT status FROM Employees WHERE username = "${username}"`
    let query_status = `UPDATE Employees SET status = 0 WHERE username = "${username}"`

    db.get(query_logout, function(err,dataLogout) {
      if (err) {
        callback(err,null)
      }else {
        if (dataLogout.status == 0) {
          callback(null,`anda belum login`)
        }else {
          db.run(query_status, function(err) {
            if (err) {
              callback(err,null)
            }else {
              callback(null,`${username} logged out`)
            }
          })
        }
      }
    })
  }
}

module.exports = Employee
