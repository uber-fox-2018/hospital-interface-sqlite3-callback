const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./hospitaldb')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(name, diagnosis, cb){
    var disease = ''
    diagnosis.forEach(element => {
      disease += element +' '
    });
    var queryInsert = `INSERT INTO patients VALUES (null,"${name}","${disease}")`
    var countPatient = `SELECT count(*) as total FROM patients`
    db.run(queryInsert,(err)=>{
      if(err){
        throw console.error(err.message)
      }else{
        db.get(countPatient,(err,data)=>{
          if(err)console.error(err.message)
          cb(data);
        })
      }
    })
  }
}

module.exports = Patient
  
