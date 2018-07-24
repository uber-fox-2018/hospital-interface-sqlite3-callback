let Patient = require('./model/patient')
let Employee = require('./model/employee')
let View = require('./view')


class Controller{
    constructor(){
        
    }

    addEmployee(username,pass,position){
        Employee.add(username,pass,position, (err, status) => {
            if (err){
                View.showLogin(err)
            } else {
                View.showLogin(status)
            }
        })
    }

    loginEmployee(username,password){
        Employee.login(username,password,(err, status)=>{
            if (err){
                View.showLogin(err)
            } else {
                View.showLogin(status)
            }   
        })
        
    }

    logOutEmployee(){
        Employee.logOut()
        View.showLogOut()
    }

    addPatient(name,diagnosis){
        Patient.addPatient(name,diagnosis,(err,status) => {
            if (err){
                View.showAddPatient(err)
            } else {
                View.showAddPatient(status)
            }
        })
    }
}

module.exports = Controller