const db = require('./setup')

class Employee {
  
  static registerEmployee(username, password, job, callback_register){
    let registerQuery = `INSERT INTO employees (username, password, job, status) VALUES ("${username}", "${password}","${job}", 0)`
    let totalQuery = `SELECT COUNT (*) as total FROM employees`
    let sameUsernameQuery = `SELECT username FROM employees WHERE username = "${username}"`
    
    if (username === undefined || password === undefined || job === undefined){
      callback_register(false, null)
    }else {
      db.all(sameUsernameQuery, (err, data) => {
        if (data.length !== 0){
          callback_register(false, undefined)
        }else {
          db.run(registerQuery, () => {
            db.get(totalQuery, (err, data) => {
              callback_register(true, data.total)
            })
          })
        }
      })
    }
  }

  static loginEmployee(username, password, callback_login){
    let cekLoginQuery = `SELECT status FROM employees WHERE  status = 1`
    let cekUserPassQuery = `SELECT username, password FROM employees WHERE username = '${username}' AND password = '${password}'`
    let changeStatusQuery = `UPDATE employees SET status = 1  WHERE username='${username}' AND password = '${password}'`

    db.all (cekLoginQuery, (err, data) => {
      if (data.length !== 0){       // already login?
        callback_login(false, null)
      }else {
        db.get(cekUserPassQuery, (err, data) => { 
          if (data == undefined){  // everyone logout but wrong format?
            callback_login(false, data)
          }else {                   // all correct condition?
            db.get(changeStatusQuery, (err) => {
              if (err) throw err
            })
            callback_login(true, data)
          }
        })
      }
    })
  }

  static logoutEmployee(callback_logout){
    let checkAllStatusQuery = `SELECT COUNT (*) as login FROM employees WHERE status = 1`
    let changeToLogoutQuery = `UPDATE employees SET status = 0`

    db.all (checkAllStatusQuery, (err, data) => {
      if (data.length > 0){
        db.get(changeToLogoutQuery, (err) => {
          callback_logout(true, data[0].login)
        })
      }
    })
  }
}
module.exports = Employee
