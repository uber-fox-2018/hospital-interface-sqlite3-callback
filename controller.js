const modEmployee = require('./model_employee');
const modPatient = require('./model_patient.js');
const View = require('./view.js')
const db = require('./setup')

class Controller { 
    static registerEmployee(username, password, job){
        modEmployee.registerEmployee(username, password, job, (err, data) => {
            
            let result = ''
            if (err === false && data === null){
                result += 'Please fill data correctly!'
            }else if (err === false && data === undefined){
                result += `Sorry, your username already taken!\n\nPlease register again...`
            }else {
                result += `Username : "${username}" as "${job}", successfull created... \n\nTotal employee : "${data}"`
            }
            View.display(result)
        })
    }

    static loginEmployee(username, password){
        modEmployee.loginEmployee(username, password, (err, data) => {
            let result =''
            if (err === false && data === null){
                result += `You cant login because, somebody already login\n\nPlease type <logout>`
            }else if (err === false && data === undefined){
                result += `Your username or password is invalid...`
            }else {
                result = `Login Success!\n\nHello "${username}", Welcome Back!`
            }
            View.display(result)
        })
    }

    static logout_employee(){
        modEmployee.logoutEmployee((err, data)=> {
            let result = ''
            if (err === true && data > 0){
                result += `Logout successfull...`
            }else {
                result += `Sorry no one is logged in`
            }
            View.display(result)
        })
    }

    static addPatient(name, diagnosis){
        modPatient.addDiagnosis(name, diagnosis, (err, data) => {
            let names = data[0]
            let totalPatients = data[1]
            let doctorName = data[2]
            let result = ''

            if (err === false && data === undefined){
                result += `Wrong format input, try again...`
            }else if (err === false && data === null){
                result += `Sorry, no doctor available in this Hospital`
            }else if (err === false && data === 0){
                result += `No doctor loging in\n\nPlease login...`
            }else {
                result += `Patient "${names}" add successful\nAdded by Doctor: "${doctorName}" \n\nTotal Patients : ${totalPatients}`
            }
            View.display(result)
        })
    }

}
module.exports = Controller