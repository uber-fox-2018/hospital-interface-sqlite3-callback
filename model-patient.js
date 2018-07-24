const db = require('./db')

class Patient {

    static addPatient(name,diagnosis,callback){
      let query = `INSERT INTO Patients (name,diagnosis) VALUES ("${name}","${diagnosis}")`
      let query_check = `SELECT * FROM Employees WHERE status = 1`

      db.all(query_check, function(err,data) {
        if (err) {
          callback(err,null)
        }else {
          if (data[0].position !== 'dokter' || data.length === 0) {
            callback(null, `tidak memiliki hak akses untuk add patient`)
          }else {
            db.run(query, function(err) {
              if (err) {
                callback(err,null)
              }else {
                callback(null,`data pasien berhasil ditambahkan, Total data pasien : ${this.lastID}`)
              }
            })
          }
        }
      })
    }
}

module.exports = Patient