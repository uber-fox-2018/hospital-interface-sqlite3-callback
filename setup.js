const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./hospital.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS Employees
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR(50),
          password VARCHAR(50),
          position VARCHAR(15),
          loginStatus VARCHAR(5) )`, 
    (err)=> {if (err){
      console.log(err.message);
    }
  });

  db.run(`CREATE TABLE IF NOT EXISTS Patients
          (id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(50),
          diagnosis VARCHAR(100) )`,
    (err)=> {if (err){
      console.log(err.message);
    }
  });

  db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  })

  console.log('database created successfully');

});