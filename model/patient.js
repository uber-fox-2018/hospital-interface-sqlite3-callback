const db = require('./db')
const Employee = require('./employee')

class Patient {
  constructor() {

  }

  static loginCheck(cb) {
    Employee.getLoginstatus(function(data){
      let stats = data
      let role = null
      let login = false
      stats.forEach(function(stat){
        if (stat.loginstatus === 1){
            login = true
            role = stat.position
        }
      })
      cb(role,login)
    })
  }

  static addPatient(name,diagnosis,cb){
    
    Patient.loginCheck(function(role,login){
      if (login){
        if (role === 'doctor'){
          let queryAddPatient = `
          INSERT INTO patients (name,diagnosis)
          VALUES ("${name}", "${diagnosis}")
          `
          db.run(queryAddPatient,function(err){
            if (err) throw err
            cb(null, `added patient successfully. total patients: ${this.lastID}`)
          })
        } else {
          cb(`you dont have access to add patient`,null)
        }
      } else {
        cb('please log in',null)
      }
    })
  }
}
 


module.exports = Patient



