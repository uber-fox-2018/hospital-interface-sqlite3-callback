const db = require('../db')
const Patient = require('./patient')

class ModelPatient {
  static addPatient(data, callback) {
    let patient = new Patient(data[0], data[1], data[2], data[3])
    let queryCheckDoctor = `SELECT * FROM Employees 
                            WHERE login = "true" AND position = "dokter"`
    let queryAddPatient = `INSERT INTO Patients (name, gender, age, diagnosis)
                           VALUES ("${patient.name}", "${patient.gender}", "${patient.age}", "${patient.diagnosis}")`

    db.all(queryCheckDoctor, (err, data) => {
      if (err) throw err;
      
      if (data.length === 1) {
        db.run(queryAddPatient, err => {
          if (err) throw err;
          
          db.all(`SELECT * FROM Patients`, (err, data) => {
            if (err) throw err;
            let totalPatient = data.length
            let message = `Data pasien berhasil ditambahkan. Total data pasien: ${totalPatient}`
            // console.log(message)
            callback(message)
          })

        })
      } else {
        console.log('Anda tidak memiliki akses menambahkan patient')
      }
    })    
  }
}

module.exports = ModelPatient