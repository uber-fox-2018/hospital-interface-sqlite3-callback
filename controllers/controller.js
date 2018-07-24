const Employee = require('../models/model-employee')
const Patient = require('../models/model-patient')
const View = require('../views/view')

class Controller {
    static register(username, password, position) {
        Employee.register(username, password, position, function(err,result) {
            if (err) {
                View.displayError(err)
            } else {
                View.displayMessage(result)
            }   
        })
    }

    static login(username, password) {
        Employee.login(username, password, function(err,result) {
            if (err) {
                View.displayError(err)
            } else {
                let result = `user ${username} is logged in succesfully`
                View.displayMessage(result)
            }
        })
    }

    static logout(username) {
        Employee.logout(username, function(err,result) {
            if (err) {
                View.displayError(err)
            } else {
                let result = `user ${username} is logged out successfully`
                View.displayMessage(result)
            }
        })
    }

    static addPatient(name, diagnosis) {
        Patient.addPatient(name, diagnosis, function(err, dataPatient) {
            if (err) {
                View.displayError(err)
            } else {
                let result = `data pasien berhasil di tambah. Jumlah Patient ${dataPatient.totalPatients}`
                View.displayMessage(result)
            }
        })
    }
}

module.exports = Controller