const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('database.db')
class CreateTable{
	static tableEmployee(){
		let query = `CREATE TABLE "employee" (
          "id"	INTEGER PRIMARY KEY AUTOINCREMENT,
          "name" TEXT,
					"username"	TEXT,
					"password"	TEXT,
					"role"	TEXT,
					"login_status" boolean)`;
		db.run(query,(err) =>{
			if(err) throw err
		})
	}
	static tablePatient(){
		let query = `CREATE TABLE "patient" (
					"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
					"name"	TEXT,
					"dianogsa"	TEXT,
					"statusHealth"	boolean)`;
		db.run(query,(err) =>{
			if(err) throw err
		})
  }
  static addEmployeTable(param){
    // console.log(param)
    let query = `INSERT INTO employee(name,username,password,role,login_status) 
    values ('${param.name}','${param.name}',${param.password},'${param.position}','false')`;
    // console.log(query)
    db.run(query,(err) =>{
      if(err) throw err
    })
  }
}

// CreateTable.tableEmployee()
// CreateTable.tablePatient()

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  addPatient(dataPasien,cb){
    let query = `SELECT COUNT(*) AS totalLength FROM patient`
    let nama = dataPasien[0]
    
    let diagnosis = dataPasien.slice(1)
    
    db.get(query,(err,data) =>{
      this.id = data.totalLength +1
      this.name = nama
      this.diagnosis = diagnosis
      db.get(`SELECT * FROM employee WHERE login_status = 'true'`,(err,data) =>{
        cb(this,data)
      })
      
    })
  }
  updatePatient(dataPasien,cb){
    let query = `INSERT INTO patient(name,dianogsa,statusHealth) VALUES ('${dataPasien.name}','${dataPasien.diagnosis.join(' ')}', 'false')`;

    
    db.get(query,(err,data) =>{
      cb(this.id)
    })
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
  addEmploye(name, position, username, password){
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    CreateTable.addEmployeTable(this)
    // cb(this)
  }
  check(fileRegister,cb){
    let query = `SELECT name from employee
    where login_status = 'true' AND role = 'admin'`;
    db.all(query,(err,data) =>{
      cb(fileRegister,data)
    })
  }
  checkStatusLogin(dataInput,cb){
    let query = `SELECT * FROM employee
    WHERE login_status = 'true'`
    db.all(query,(err,data) =>{
      db.all(`SELECT * FROM employee`,(err,dataEmployee) =>{
        cb(dataInput,dataEmployee,data)
      })
    })
  }
  login(dataLogin){
    let query = `UPDATE employee SET login_status = 'true' WHERE id = ${dataLogin.id}`
    db.run(query,(err) =>{})
  }
  logout(cb){
    let query = `SELECT * FROM employee
    WHERE login_status = 'true'`
    db.get(query,(err,data)=>{
      if(!data){
        cb(false)
      }else{
        cb(true)
        let query = `UPDATE employee SET login_status = 'false' WHERE id = ${data.id}`  
        db.run(query,(err) =>{
        })
      } 
    })
  }
}


module.exports = {Patient:Patient,Employee:Employee}