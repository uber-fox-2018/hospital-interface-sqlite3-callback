const Employee = require('./model-employee')
const Patient  = require('./model-patient')
const View     = require('./view')


class Controller {
    static register(username,password,position){
        Employee.register(username,password,position, function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showRegistered(data)
            }
        })
    }

    static login(username,password){
        Employee.login(username,password,function(err,data) {
            if (err) {
                View.showError(err)
            }else{
                View.showLoggedIn(data)
            }
        })
    }

    static addPatient(name,diagnosis){
        Patient.addPatient(name,diagnosis,function(err,data){
            if (err) {
                View.showError(err)
            }else {
                View.showAddPatient(data)
            }
        })
    }

    static logout(username){
        Employee.logout(username,function(err,data) {
            if (err) {
                View.showError(err)
            }else {
                View.showLoggedOut(data)
            }
        })
    }
}

module.exports = Controller