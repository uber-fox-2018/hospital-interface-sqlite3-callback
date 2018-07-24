const db = require('../db')

class Patient {

    static add (patient, diagnosis, callback) {
        let queryAdd = `INSERT INTO Patients (name, diagnosis) 
                        VALUES ("${patient}", "${diagnosis}")`
        let queryTotal = `SELECT COUNT(id) AS totalPatient FROM Patients`
        let queryCheck = `SELECT * FROM Employees WHERE login = "On" AND role = "dokter"`

        db.get(queryCheck, (err, checkLogin) => {
            if(err) {
                callback(err, null)
            }else {
                if(checkLogin !== undefined) {
                    db.run(queryAdd, (err) => {
                        if(err) {
                            callback(err)
                        }else {
                            db.get(queryTotal, (err, total) => {
                                if(err) {
                                    callback(err, null)
                                }else {
                                    callback(null, total)
                                }
                            })
                        }
                    })
                }else {
                    let err = { message: `tidak memiliki akses untuk add patient` }
                    callback(err, null)
                }
            }
        })
    }

}

module.exports = Patient;