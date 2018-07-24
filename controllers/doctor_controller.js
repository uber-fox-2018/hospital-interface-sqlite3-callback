const DbContext = require('../models/dbcontext');
const DoctorView = require('../views/doctor_view');

class DoctorController {
    constructor(connection) {
        this._model = new DbContext(connection);
        this._view = new DoctorView();
    }

    addPatient(name, diagnoses) {
        this.isDoctorHandler(employeeId => {
            let patient = { name: name, doctorId: employeeId, diagnoses: diagnoses };
            this._model.patients.add(patient, (err, lastId) => {
                this._model.patients.find(lastId, (err, patient) => {
                    this._model.patients.countByDoctor(patient.doctorId, (err, total) => {
                        this._view.displayAddPatientSuccess(patient, total);
                    })
                })
            });
        })
    }

    isDoctorHandler(callback) {
        this.loginHandler((err, employeeId) => {
            this._model.employees.find(employeeId, (err, empRow) => {
                this._model.roles.find(empRow.roleId, (err, roleRow) => {
                    if (roleRow.name === 'doctor')
                        callback(employeeId);
                    else
                        this._view.displayNotAuthorized();
                });
            });
        })
    }

    loginHandler(callback) {
        this._model.logins.isLogin((err, isLogin, employeeId) => {
            if (isLogin)
                callback(err, employeeId);
            else
                console.log('Not logged in.')
        })
    }
}

module.exports = DoctorController;