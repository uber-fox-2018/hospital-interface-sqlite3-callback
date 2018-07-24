const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

class Patient {
  constructor(name, diagnosisArr) {
    this.name = name
    this.diagnosis = diagnosisArr.join(', ')
  }
}

class Employee {
  constructor(inputArr) {
    this.username = inputArr[0]
    this.password = inputArr[1]
    this.position = inputArr[2]
    this.loginStatus = 'false'
  }
}

class Hospital {
  
  static addEmployee (empArr, cb){
    let newEmp = new Employee (empArr);
    let keys = (Object.keys(newEmp)).join(', ');

    db.serialize(() => {
      let total;
      db.all(`SELECT * FROM 'Employees'`, (err, rows) => {
        if (err){
          console.log(err.message);
        } else {
          total = rows.length + 1;
        }
      })

      db.run(`INSERT INTO 'Employees' (${keys}) VALUES('${newEmp.username}', '${newEmp.password}', '${newEmp.position}', '${newEmp.loginStatus}')`, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          cb(`username: ${newEmp.username}, position: ${newEmp.position} with password ${newEmp.password} saved successfully. Total employee : ${total}`);
        }
      })
    })
  }

  static loggingIn (name, pwd, cb){
    db.get(`SELECT * FROM 'Employees' WHERE username = '${name}' AND password = '${pwd}'`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        if (!row){
          cb (`wrong username / password`);
        } else {
          db.run (`UPDATE 'Employees' SET loginStatus = 'true' WHERE username = '${name}'`, (err) => {
            if (err) {
              console.log(err.message);
            } else {
              cb (`${name} logged in successfully`);
            }
          })
        }
      }
    })
  }

  static isAnotherLoggedIn (cb){
    db.get(`SELECT * FROM 'Employees' WHERE loginStatus = 'true'`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        if (!row){
          cb (false);
        } else {
          cb (true);
        }
      }
    })
  }

  static isDoctorLoggedIn (cb){
    db.get(`SELECT * FROM 'Employees' WHERE position = 'doctor' AND loginStatus = 'true'`, (err, row) => {
      if (err){
        console.log(err.message);
      } else {
        if (!row){
          cb (false);
        } else {
          cb (true);
        }
      }
    })
  }

  static logout (cb){
    db.run (`UPDATE 'Employees' SET loginStatus = 'false'`, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        cb (`logged out successfully`);
      }
    })
  }

  static addPatient (name, diagnosis){
    let newPatient = new Patient (name, diagnosis);
    let keys = (Object.keys(newPatient)).join(', ');

    db.serialize(() => {
      let total;
      db.all(`SELECT * FROM 'Patients'`, (err, rows) => {
        if (err){
          console.log(err.message);
        } else {
          total = rows.length + 1;
        }
      })

      db.run(`INSERT INTO 'Patients' (${keys}) VALUES('${newPatient.name}', '${newPatient.diagnosis}')`, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          cb(`patient with name: ${newPatient.name}, with diagnois(es): ${newPatient.diagnosis} saved successfully. Total patient : ${total}`);
        }
      })
    })
  }
}

module.exports = Hospital;