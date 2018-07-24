const db = require('./db.js');

class Employee {
  constructor(name, username, password, position) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.position = position;
    this.loginstatus = 0;
  }

  static countEmployees(callback) {
    const queryCount = `SELECT COUNT(id) AS totalEmployees FROM Employees`;
    db.get(queryCount, function(err, countData) {
      if (err) {
        callback(err);
      } else {
        // console.log('----', countData)
        callback(err, countData.totalEmployees);
      }
    })
  }

  static registerEmployee(name, username, password, position, callback) {
    let employee = new Employee(name, username, password, position);
    const queryRegister = `INSERT INTO Employees (name, username, password, position, loginstatus)
                           VALUES ("${employee.name}", "${employee.username}", "${employee.password}", "${employee.position}", "${employee.loginstatus}")`;
    db.run(queryRegister, function (err) {
      if (err) {
        callback(err, null)
      } else {
        Employee.countEmployees(function (err, data) {
          // console.log('===', data)
          callback(null, [employee, JSON.stringify(data)]);
        })
      }
    })
  }

  /**
   * 
   * @param {*} callback 
   * output: true sudah ada yang login
   *         false belum ada silakan login
   */
  static checkUserLoggedIn(callback) {
    const queryLogin = `SELECT loginstatus FROM Employees WHERE loginstatus = 1`;
    db.get(queryLogin, function (err, data) {
      if (err) {
        callback(err, null); //
      } else {
        // console.log('LOGIN: ', login)
        let isLogin = false;
        if (data) isLogin = true
        callback(null, isLogin)
      }
    })
  }


  /**
   * 
   * @param {*} username 
   * @param {*} password 
   * @param {*} callback 
   * output: false jika data tidak ditemukan (invalid username/pass)
   *         true jika data ditemukan
   */
  static checkUserAndPassword(username, password, callback) {
    const queryCheckLogin = `SELECT username, password FROM Employees WHERE username = "${username}" AND password = "${password}"`;
    db.get(queryCheckLogin, function (err, dataLogin) {
      if (err) {
        callback(err, null);
      } else {
        if (dataLogin == undefined) {
          callback(null, false)
        } else {
          callback(null, true)
        }
      }
    })
  }

  static setLogin(username, password, callback) {
    const querySetLoggedin = `UPDATE Employees SET loginstatus = 1 WHERE username = "${username}" AND password = "${password}"`;
    db.run(querySetLoggedin, function (err) {
      if (err) {
        callback(err, null)
      } else {
        callback(null, this);
      }
    })
  }

  static loginEmployee(username, password, callback) {
    Employee.checkUserLoggedIn(function (err, loginstatus) {
      if (err) {
        callback(err, null);
      } else {
        if (loginstatus == true) {
          let msg = { message: "User has already logged in." };
          callback(msg.message, null);
        } else {
          Employee.checkUserAndPassword(username, password, function(err, dataLogin) {
            if (!dataLogin) {
              let msg = {message: `Username/Password invalid`};
              callback(msg.message, null);
            } else {
              Employee.setLogin(username, password, function (err, data) {
                if (err) {
                  callback(err, null);
                } else {
                  callback(null, data);
                }
              })
            }
          })
        }
      }
    })
  }
  static logout(callback) {
    const queryLogout = `UPDATE Employees SET loginstatus = 0 WHERE loginstatus = 1`;
    db.run(queryLogout, function (err, logout) {
      if (err) throw err
      callback(logout);
    })
  }

}



module.exports = Employee;