const DbSet = require('./dbset');
const Patient = require('./patient');

class PatientDbSet extends DbSet {
    constructor(db) {
        super(db, 'patients');
    }

    add(obj, callback) {
        this.addPatientHandler(obj, (err, lastId) => {
            this.addPatientsDiagnoses(lastId, obj.diagnoses, err => {
                callback(err, lastId);
            });
        });
    }

    addPatientHandler(obj, callback) {
        let sql = `INSERT INTO patients (name, doctorId) VALUES (?,?)`;
        let params = [obj.name, obj.doctorId];
        this._db.run(sql, params, function (err) {
            callback(err, this.lastID);
        });
    }

    find(id, callback) {
        let sql = `SELECT * FROM patients WHERE id = ?`;
        let params = [id];
        this._db.get(sql, params, (err, row) => {
            let patient = Object.assign(new Patient(), row);
            callback(err, patient);
        });
    }

    countByDoctor(doctorId, callback) {
        let sql = `SELECT COUNT(*) AS count FROM patients WHERE doctorId = ?`;
        let params = [doctorId];
        this._db.get(sql, params, (err, row) => callback(err, row.count));
    }

    addPatientsDiagnoses(patientId, diagnoses, callback) {
        let sql = `INSERT INTO patients_diagnoses (patientId, diagnosisId) VALUES (?,?);`;
        diagnoses.forEach(diagnosis => {
            this.findDiagnosis(diagnosis, (err, diagnosisId) => {
                if (diagnosisId) {
                    this._db.serialize(() => {
                        this._db.run(sql, [patientId, diagnosisId]);
                    })
                }
                else {
                    this.addDiagnosis(diagnosis, (err, lastId) => {
                        this._db.serialize(() => {
                            this._db.run(sql, [patientId, lastId]);
                        });
                    });
                }
            });
        });
        callback();
    }

    findDiagnosis(name, callback) {
        let sql = `SELECT * FROM diagnoses WHERE name = ?`;
        let params = [name];
        this._db.get(sql, params, (err, row) => {
            if (!row)
                callback(err);
            else
                callback(err, row.id);
        });
    }

    addDiagnosis(name, callback) {
        let sql = `INSERT INTO diagnoses (name) VALUES (?)`;
        let params = [name];
        this._db.run(sql, params, function (err) {
            callback(err, this.lastID);
        });
    }
}

module.exports = PatientDbSet;