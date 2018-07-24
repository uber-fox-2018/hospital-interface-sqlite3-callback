const db = require('./db.js')

class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static m_addPatient(name,diagnosis,cb){
        let queryAddPatient = `INSERT INTO Patient(name,diagnosis) VALUES ("${name}","${diagnosis}")`
        let queryDokterLogin = `SELECT * FROM Employee WHERE loginStatus = 1 AND role = dokter `
        let queryTotalPatient = `SELECT COUNT(id) AS totalPatient FROM Patients`
        
        db.get(queryDokterLogin, (err, data) => {
            if(err) {
                callback(err, null)
            }else {
                if(data !== undefined) {
                    db.run(queryAddPatient, (err, dataAdd) => {
                        if(err) {
                            callback(err, null)
                        }else {
                            db.get(queryTotalPatient, function(err, dataTotal) {
                                if(err) {
                                    callback(err, null)
                                }else {
                                    callback(null, dataTotal)
                                }
                            })
                        }
                    })
                }else {
                    callback(err, null)
                }
            }
        })
    }




    

  }

  module.exports = Patient