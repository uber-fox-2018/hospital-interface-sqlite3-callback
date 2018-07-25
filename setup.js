const db = require('./db')

const setup = () => {

  let createTableEmployee = `CREATE TABLE IF NOT EXISTS Employees 
                             (id INTEGER PRIMARY KEY AUTOINCREMENT,
                             name VARCHAR(30), username VARCHAR(30), 
                             password VARCHAR(100), position VARCHAR(30), 
                             login VACRHAR(5))`
  let createTablePatient = `CREATE TABLE IF NOT EXISTS Patients
                            (id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name VARCHAR(30), gender VARCHAR(6), age INTEGER,
                            diagnosis VARCHAR(100))`

  db.serialize(() => {
    db.run(createTableEmployee, err => {
      if (err) throw err;
      console.log("Create table employee successfully")
    });

    db.run(createTablePatient, err => {
      if (err) throw err;
      console.log("Create table patient successfully")
    });
  })
}

setup()