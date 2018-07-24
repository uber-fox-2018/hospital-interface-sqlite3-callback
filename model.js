const Controller= require("./controller.js")
var sqlite= require('sqlite3').verbose()
var db= new sqlite.Database('hospital.db')

db.run("CREATE TABLE IF NOT EXISTS Employees (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, position TEXT)")
db.run("CREATE TABLE IF NOT EXISTS Patients (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, diagnosis TEXT)")


class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}
 
class Employee {
  constructor(username, password,position) {
    //this.name = name
    this.username = username
    this.password = password
    this.position = position
    this.status = 0
  }

}

class Model {

 static register(myUserName,myPassword,myPosition,cb) {
  db.serialize(function() {
    db.run(`INSERT INTO Employees(username,password,position) VALUES ("${myUserName}","${myPassword}","${myPosition}")`,(err) => {
        if(err) {
        console.log('error')
      }
    })

    db.all(`SELECT COUNT(*) AS jumlahEmployee FROM Employees;`, (err,rows) => {
      cb(`{"username":"${myUserName}","password":${myPassword},"role":${myPosition}}`) 
    })  
  })
 }

 static login(myUserName,myPassword,cb) {
    db.get(`SELECT * FROM Employees WHERE username = "${myUserName}" AND password = "${myPassword}";`,(err,rows) => {
      if(rows==undefined){
        
        cb('username or password is wrong')
      }else{
        db.run(`UPDATE Employees WHERE username = "${myUserName}" AND password  = "${myPassword}"`)
        //db.run(`UPDATE Employees WHERE username != "${myUserName}" AND password != "${myPassword}"`)
        cb(`user ${myUserName} login successfully`)
      } 
    })
 }

 static addPatient(myPatient,myDiagnosis,cb) {
    db.get(`SELECT * FROM Employees WHERE position = "dokter";`, (err,rows) => {
      if(rows==undefined) {
        cb(`tidak memiliki akses untuk add patient`)
      }else {
        db.run(`INSERT INTO Patients(name,diagnosis) VALUES ("${myPatient}","${myDiagnosis.join(" ")}");`)
        cb(`data pasien berhasil ditambahkan`)
      }
        
    })
 }

}







module.exports=Model