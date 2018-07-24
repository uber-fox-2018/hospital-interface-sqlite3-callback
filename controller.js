const View = require('./view.js')
const Model = require('./model.js')
var Patient = new Model.Patient
var Employee = new Model.Employee

class Controller{
    static help(){
        let command = ['','help','register <Username> <Password> <Position>','login <Username> <Password>','addPatient <PatientName> <Diagnosis Patient>','logout']
        for(let i = 0 ; i < command.length ; i++){
            View.help(command[i])
        }
    }

    static register(dataRegister,data){
        if(!data[0]){
            View.canNotAccess('admins')
        }else{
            Employee.addEmploye(dataRegister[0],dataRegister[2],dataRegister[0],dataRegister[1],Controller)
            // this.cbRegister(dataRegister)
            let data = {name:dataRegister[0],position:dataRegister[2]}
            // console.log(data);
            
            View.displayRegister(data)
            
        }
    }
    static checkAdmin(data){
        if(data.length !== 3){
            this.help()
        }else{
            // Employee.addEmploye(data[0],data[2],data[0],data[1])
            Employee.check(data,this.register)
        }
    }
    static checkLogin(dataLogin,dataEmployee,data){
        let dataLoginMatch = false
        let adaYangLogin = false
        let dataYangLogin = null
        dataLogin = {username:dataLogin[0],password:dataLogin[1]}
        
        if(data.length===1){
            View.displayAlreadyLogin(data)
        }else{
            for(let i = 0 ; i < dataEmployee.length ; i++){
                if(dataEmployee[i].login_status === true){ // kalau ada user lain yang login
                    adaYangLogin = true
                }
                if(dataEmployee[i].username === dataLogin.username && dataEmployee[i].password === dataLogin.password && dataEmployee[i].login_status === 'false'){
                    dataLoginMatch = true
                    dataYangLogin = dataEmployee[i]
                }
                
            }
            
            if(dataLoginMatch === true && adaYangLogin === false){
                Employee.login(dataYangLogin)
                View.login(dataYangLogin)
            }else if(dataLoginMatch === true && adaYangLogin === true){
                displayAlreadyLogin(dataYangLogin)
            }else{
                View.idPasswordSalah()
            }
        }
        
        
    }
    static login(dataInput){
        Employee.checkStatusLogin(dataInput,this.checkLogin)
    }
    static cbUpdatePatient(id){
        // console.log(id);
        View.displayAddPatient(id)
        
    }
    static updatePatient(dataPasien,dataEmployee){
        if(dataEmployee.role !== 'dokter'){
            View.canNotAccess('doctors')
        }else{
            Patient.updatePatient(dataPasien,Controller.cbUpdatePatient)
        } 
    }
    static addPatient(dataInput){
        Patient.addPatient(dataInput,this.updatePatient)
    }
    static cbLogout(report){
        // View.logout()
        // console.log(report);
        if(!report){
            View.logout('kamu sudah logout')
        }else{
            View.logout('berhasil logout')
        }
        
    }
    static logout(){
        Employee.logout(this.cbLogout)
    }
}

module.exports = Controller