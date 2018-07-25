const Employee = require("./employee");
const db = require("../db");

class ModelEmployee {
  static register(data, callback) {
    let employee = new Employee(data[0], data[1], data[2], data[3]);
    let queryRegister = `INSERT INTO Employees 
                         (name, username, password, position, login)
                         VALUES ("${employee.name}","${employee.username}", "${employee.password}", "${employee.position}", "${employee.login}")`;

    db.run(queryRegister, err => {
      if (err) throw err;
      let querySelectAllData = `SELECT * FROM Employees`;

      db.all(querySelectAllData, (err, data) => {
        if (err) throw err;
        let totalEmployee = data.length;
        let sendData = {
          "name": employee.name, 
          "username": employee.username, 
          "password": employee.password, 
          "position": employee.position, 
          "total": totalEmployee
        }
        callback(sendData);
      });
    });
  }

  static login(data, callback) {
    let username = data[0];
    let password = data[1];
    let queryLogin       = `SELECT username, password FROM Employees 
                            WHERE username = "${username}" AND password = "${password}"`;
    let queryCheckLogin  = `SELECT COUNT(login) AS countLogin, username
                            FROM Employees 
                            WHERE login = "true"`;
    let queryUpdateLogin = `UPDATE Employees SET login = "true" WHERE username = "${username}"`;

    db.all(queryLogin, (err, data) => {
      if (err) throw err;

      if (data.length === 0) {
        let messageErr = {"msgErr": "Username or password wrong"};
        callback(messageErr, null);
      } else {
        db.all(queryCheckLogin, (err, data) => {
          if (err) throw err;

          if (data[0].countLogin >= 1) {
            let messageErr = {"msgErr": "Sorry there's already signed in"};
            callback(messageErr, null);
          } else {
            db.run(queryUpdateLogin, err => {
              if (err) throw err;
              let message = {"username": username};
              callback(null, message);
            });
          }
        });
      }
    });
  }

  static logout(callback) {
    let queryLogout = `SELECT username FROM Employees WHERE login = "true"`
    let queryUpdateLogin = `UPDATE Employees SET login = "false"`

    db.all(queryLogout, (err, data) => {
      if (err) throw err;

      if (data.length === 0) {
        let messageErr = {"msgErr": 'Silahkan login terlebih dahulu!'}
        callback(messageErr, null)
      } else {
        db.run(queryUpdateLogin, err => {
          if (err) throw err;
          let sendData = {"username": data[0].username}
          callback(null, sendData)
        })
      }
    })
  }
}

module.exports = ModelEmployee;
