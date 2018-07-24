let Model_employee = require('./modelEmplyee.js')
let Model_patient = require ('./model.js')
let View = require('./view.js')
class Controller {
    static createTable (){
        Model_employee.createTable()
        Model_patient.createTable()
    }

    static initData(){
        Model_employee.initData()
        Model_patient.initData()
    }
    static registration(data){

        Model_employee.createEmployee(data[0], data[1], data[2], data[3],'x',(employeeData)=>{
            View.registration(employeeData)
        })
    }
    static login(input){
        Model_employee.login(input[0],input[1],resultLogin =>{
            View.login(resultLogin)
        })
    }

    static addPatient(dataPatient,diagnosis){
        Model_employee.addPatient(dataPatient[0],diagnosis,result =>{
            View.addPatient(result)
        })
    }
    static logout(username){
        Model_employee.login(username ,resultLogout=>{
            View.login(resultLogout)
        })
    }

}

module.exports = Controller