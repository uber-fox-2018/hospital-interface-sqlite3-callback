const db = require('../db')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(patientName, diagnosis, callback) {
    let queryAdd_Patient = `INSERT INTO Patients (patientName, diagnosis) VALUES ("${patientName}", "${diagnosis}")`
    let queryTotal_Patient = `SELECT COUNT (*) AS totalPatients FROM Patients`
    let queryCheck_Doctor = `SELECT * FROM Employees WHERE isLogin = "ON" AND position = "dokter"`

    db.get(queryCheck_Doctor, function(err, checkDokter) {
      if (err) {
        throw err
      } else {
        if (!checkDokter) {
          let err = { message: `tidak memiliki akses untuk add patient` }
          callback(err, null)
        } else {
          db.run(queryAdd_Patient, function(err, add_DataPatient) {
            if (err) throw err
            db.get(queryTotal_Patient, function(err, dataPatient) {
              if (err) throw err
              callback(null, dataPatient)
            })
          })
        }
      }
    })
  }

}

module.exports = Patient