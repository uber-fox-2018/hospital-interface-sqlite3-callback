const Patient = require("./patient");
const Employee = require("./employee");
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./hospital.db");

class Model {
  constructor() {}

  m_register(username, password, position, cb) {
    let employee = new Employee(username, password, position);

    let query = `INSERT INTO Employees (username,password,position) 
VALUES ("${employee.username}","${employee.password}","${employee.position}")`;

    db.run(query, function(err) {
      if (err) {
        cb(err.message);
      } else {
        let info = `New Employee Registered: ${JSON.stringify(
          employee
        )} , total employee: ${this.lastID}`;
        cb(info);
      }
    });
  }

  m_login(username, password, cb) {
    let info;
    let query = `SELECT * FROM Employees`;
    db.all(query, function(err, row) {
      if (err) {
        cb(err.message,null);
      } else {
        let foundId = row.filter(function(element) {
          return element.username == username && element.password == password;
        });
        let findLogin = row.find(x => x.login === 1);
        if (foundId.length) {
          if (!findLogin) {
            let queryLogin = `UPDATE Employees SET login = 1 WHERE username = "${username}" AND password = "${password}"`;
            db.run(queryLogin, function(err) {
              if (err) {
                throw err.message;
              } else {
                info = `login: username ${username} success`;
                cb(null,info);
              }
            });
          } else {
            info = `${findLogin.username} sedang login`;
            cb(null,info);
          }
        } else {
          info = `username atau password salaah`;
          cb(null,info);
        }
      }
    });
  }

  m_addPatient(name, diagnosis, cb) {
    let info;
    let query = `select * from Employees`;

    db.all(query, function(err, row) {
      if (err) cb(err.message);
      let findDokter = row.find(x => x.position == `dokter` && x.login === 1);
      if (findDokter) {
        let patient = new Patient(name, diagnosis);

        let query = `INSERT INTO Patients (name,diagnosis) 
    VALUES ("${patient.name}","${patient.diagnosis}")`;
        db.run(query, function(err) {
          if (err) {
            cb(err.message);
          } else {
            info = `New Patient Registered: ${JSON.stringify(
              patient
            )}, total patient: ${this.lastID}`;
            cb(info);
          }
        });
      } else {
        info = `you're not a doctor`;
        cb(null, info);
      }
    });
  }

  m_logout(username, cb) {
    let info;
    let query = `select * from Employees`;
    db.all(query, function(err, row) {
      if (err) throw err.message;
      let findLogin = row.find(data => data.login === 1);
      if (findLogin) {
        let queryLogin = `UPDATE Employees SET login = 0 WHERE username = "${username}"`;
        db.run(queryLogin, function(err) {
          if (err) {
            cb(err.message,null);
          } else {
            info = `logout: username ${username} success`;
            cb(null,info);
          }
        });
      }
    });
  }
}

module.exports = Model;
//---------------------------------------------------------//
