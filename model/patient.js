const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./hospital.db')

class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }
}

class Model {
    static addPatient(name, diagnosis, cb) {
        db.serialize(function () {
            db.get(`select * from Employees 
                    where Employees.position = 'dokter' and Employees.isLogin = 1`, function (err, dokterLogin) {
                    if (err) {
                        throw err
                    } else {
                        if (dokterLogin) {
                            db.run(`insert into Patients(name,diagnosis)
                                values('${name}','${diagnosis}')`, function (err) {
                                    if (err) throw err;
                                    db.get(`select count(*) as total from Patients`, function (err, patient) {
                                        if (err) {
                                            throw err.message
                                        } else {
                                            // let message = { success: `data pasien berhasil ditambahkan. Total data pasien : ${patient.total}` }
                                            cb(null,patient.total)
                                        }
                                    })
                                })
                        } else {
                            let message = { error: `tidak memiliki akses untuk add patient` }
                            cb(message.error,null)
                        }
                    }
                })
        })

    }
}

module.exports = Model