const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

class Model {

  static registerEmployee(username, password, position, cb) {
    let query = `insert into Employees(username, password, position)
    Values("${username}","${password}","${position}")`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) {
          throw err
        }
        db.get(`select count(*) as total from Employees;`, function (err, data) {
          if (err) {
            throw err
          }
          cb(username, password, position, data.total)
        })
      })
    })
  }

  static loginEmployee(username, password, cb) {
    db.serialize(function () {
      db.get(`select count(*) as login from Employees where Employees.isLogin = 1`, function (err, data) {
        if (err) { throw err }
        // console.log(data.login)
        if (data.login > 0) {
          let message = { error: 'another user is login, please wait until another user logout', }
          cb(message.error,null)
        } else if(data.login === 0){
          db.all(`select * from Employees where Employees.username = '${username}' and Employees.password = '${password}'`, function (err, dataEmployees) {
            if (err) {
               throw err 
            }
            // console.log(dataEmployees);
            // console.log(dataEmployees.length);
            if (dataEmployees.length > 0) {
              db.run(`update Employees set isLogin = 1 where Employees.username = '${username}' and Employees.password = '${password}'`, function (err) {
                if (err) { throw err }
                cb(null,username)
                // let message = { success: `user ${username} logged in succesfully` }
                // return cb(message.success,null)
              })
            } else {
              let message = { error: 'username/password is wrong' }
              return cb(message.error,null)
            }
          })
        }
      })
    })
  }

  static logoutEmployee(username, cb) {
    db.serialize(function () {
      db.get(`select count(*) as logout from Employees where Employees.isLogin = 1`, function (err, data) {
        if (err) { throw err }
        // console.log(data.logout)
        if (data.logout > 0) {
          db.run(`update Employees set isLogin = 0 where username = '${username}'`, function (err) {
            if (err) { throw err }
            cb(null,username)
          })
        }else{
          let message = { error: `you need to login yet`}
          cb(message.error,null)
        }
      })
    })
  }


}

module.exports = Model


