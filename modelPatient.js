const db = require('./db.js')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static m_addPatient(name,diagnosis,cb){
        let queryAddPatient = `INSERT INTO Patient(name,diagnosis) VALUES ("${name}","${diagnosis}")`
        let queryDokterLoggin = `SELECT * FROM Employee WHERE role = dokter AND loginStatus = 1`

        // db.get(queryDokterLoggin, function(err){
        //     if(err) throw err
        //     if()
        // })



    }

  }

  module.exports = Patient