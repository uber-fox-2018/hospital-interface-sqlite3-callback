const db = require('./db.js');

class Patient {
    constructor(name, diagnosis) {
        // this.id = id;
        this.name = name;
        this.diagnosis = diagnosis;
    }

    static countPatients(callback) {
        const queryCount = `SELECT COUNT(id) AS totalPatients FROM Patients`;
        db.get(queryCount, function (err, countData) {
            if (err) {
                callback(err);
            } else {
                // console.log(countData.totalPatients);
                callback(err, countData.totalPatients)
            }
        })
    }

    static addPatients(name, diagnosis, callback) {
        let patient = new Patient(name, diagnosis);
        const queryCheckDoc = `SELECT * FROM Employees WHERE loginstatus = 1`;
        db.get(queryCheckDoc, function (err, data) {
            if (data == undefined) {
                let msg = {message: `A doctor must login to add patients.`}
                callback(msg.message, null)
            } else {
                if (data.position == 'doctor') {
                    const queryAddPatient = `INSERT INTO Patients (name, diagnosis)
                                                 VALUES ("${patient.name}", "${patient.diagnosis}")`;
                    db.run(queryAddPatient, function (err) {
                        if (err) throw err
                        Patient.countPatients(function (err, data) {
                            // console.log('---', data);
                            callback(null, JSON.stringify(data));
                        })
                    })
                } 
            } 
        })
    }
}

// Patient.addPatients('helmi', 'sakit', function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })
module.exports = Patient;
