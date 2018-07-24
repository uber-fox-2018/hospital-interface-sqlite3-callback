const db = require('./setup')

class Patient {

    static addDiagnosis(name, diagnosis, callback_diagnosis){
        // console.log(diagnosis);
        
        let checkDoctorQuery = `SELECT COUNT(*) AS totalDoctor FROM employees WHERE job = 'doctor'`
        let checkDoctorLoginQuery = `SELECT username FROM employees WHERE status = 1 AND job = 'doctor'`
        
        if (name === undefined || diagnosis === undefined || diagnosis.length === 0){   // wrong input
            callback_diagnosis(false, undefined)    
        }else {
            db.all(checkDoctorQuery, (err, data)=> {

                let availableDoctor = data[0].totalDoctor
                if (availableDoctor === 0){  // no doctor available
                    callback_diagnosis(false, null)  
                }else {
                    db.get(checkDoctorLoginQuery, (err, data) => {
                        if (data === undefined){    // no doctor loging in
                            callback_diagnosis(false, 0)
                        }else {
                            let deseases = diagnosis.join(' ')
                            let addDiagnosisQuery = `INSERT INTO patients (name, diagnosis) VALUES ("${name}", "${deseases}")`
                            let addTotalPatientQuery = `SELECT COUNT (*) AS totalPatients FROM patients`
                            let doctorName = data.username
                            db.run (addDiagnosisQuery, () => {
                                db.get(addTotalPatientQuery, (err, data) => {
                                    let names = [name, data.totalPatients, doctorName]
                                    callback_diagnosis(true, names)
                                })
                            })
                        }
                    })
                }
            })
        }
    }
}
module.exports = Patient
