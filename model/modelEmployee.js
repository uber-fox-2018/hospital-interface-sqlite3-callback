const sql = require('sqlite3').verbose()
let db = new sql.Database('./hospitaldb')

class Employee {
  static register(username, password, position,cb){
    var queryInsert = `INSERT INTO employees VALUES (null, "${username}","${password}","${position}",0);`
    var queryTotalEmploye = `SELECT COUNT(*) as totalEmployee FROM employees`

    db.run(queryInsert,function(err,data){
      if(err){
        throw console.error(err.message)
      }else{
        db.get(queryTotalEmploye,function(err,data){
          if(err)throw err
          cb(username,password,position,data.totalEmployee)
        })
      }
    })
    
  }

  static login(username, password,cb){
    var queryLogin = `SELECT * FROM employees WHERE username = "${username}" AND password = "${password}"`
    var cekLogin = `SELECT count(*) as totalLogin FROM employees WHERE loginStatus = 1`
    var updateStatus = `UPDATE employees 
                        SET loginStatus = 1
                        WHERE username = "${username}" AND password = "${password}"`
    db.get(cekLogin,(err,data)=>{
      if(err){
        throw err
      }else if(data.totalLogin > 0){
        cb(data.totalLogin)
      }else{
        db.get(queryLogin,(err,data)=>{
          if(err){
            throw console.error(err.message)
          }else{
            db.run(updateStatus, (err)=>{
              if(err){
                cb(err)
              }
            })
            cb(data)
          }
        })
      }
    })
    
  }

  static cekLogin(cb){
    var querycekLogin = `SELECT * FROM employees WHERE loginStatus = 1`

    db.get(querycekLogin,(err,data)=>{
      if(err){
        throw console.error(err.message)
      }else{
        if(data.position === 'dokter'){
          cb(true)
        }else{
          cb(false)
        }
      }
    })
  }


  static logout(cb){
    var querycekLogin = `SELECT * FROM employees WHERE loginStatus = 1`
    db.get(querycekLogin,(err,data)=>{
      if(err){
        throw console.error(err.message)
      }else{
        if(data === undefined){
          cb(false)
        }else{
          var queryLogout = `UPDATE employees
                              SET loginStatus = 0
                              WHERE id = ${data.id}`
          db.run(queryLogout,(err)=>{
              if(err)throw console.error(err.message)
              cb(true)
          })
        }
        
      }
    })
  }
}



module.exports = Employee


