const View = require("./view.js");
const Model = require("./model.js");


class Controller{
    static addEmployees(username, password, role){
        Model.addEmployee(username, password, role, (employeeObj, length) =>{
            View.addEmployee(employeeObj, length);
        });
    }

    static login(username, password){
        Model.login(username, password, result=>{
            View.login(result);
        });
    }

    static addPatients(name, diagnoses){
        Model.addPatient(name, diagnoses, (result) =>{
            View.addPatient(result);
        })
    }

    static logoutUser(username, password){
        Model.logout(username, password, (changes)=>{
            View.logout(username, changes)
        })
    }

    static help(){
        View.help();
    }
}
module.exports = Controller;