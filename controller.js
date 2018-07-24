const Employee = require('./models/employee')
const Patient = require('./models/patient')
const View = require('./view')

class Controller {

    static registerEmployee(username, password, role) {
        Employee.register(username, password, role, (err, dataRegister) => {
            if (err) {
                View.showError(err)
            }else {
                let result = `Save data success ${JSON.stringify(dataRegister.employee)}. Total employee : ${dataRegister.totalEmployee}`
                View.show(result)
            }
            
        })
    }

    static loginEmployee(username, password) {
        Employee.login(username, password, (err, result) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `user "${username}" logged in successfully`
                View.show(result)
            }
            
        })
    }

    static addPatient(patient, diagnosis) {
        Patient.add(patient, diagnosis, (err, total) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `data pasien berhasil ditambahkan. Total data pasien : "${total.totalPatient}"`
                View.show(result)
            }
            
        })
    }

    static logoutEmployee(username) {
        Employee.logout(username, (err, result) => {
            if(err) {
                View.showError(err)
            }else {
                let result = `user "${username}" logout in successfully`
                View.show(result)
            } 
        })
    }
}

module.exports = Controller;