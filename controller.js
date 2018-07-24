const Employee = require('./employee')
const Patient = require('./patient')
const View = require('./view')


class Controller {
    constructor(argv){
        this.command = argv
        this.cmd()
    }

    cmd(){
        if(this.command[0] === 'help' || this.command.length === 0){
            this.help()
        } else if(this.command[0] === 'login'){
            this.loginEmployee()
        } else if(this.command[0] === 'logout'){
            this.logoutEmployee()
        } else if(this.command[0] === 'register'){
            this.registerEmployee()
        } else if(this.command[0] === 'list-employees'){
            this.listEmployee()
        } else if(this.command[0] === 'add-patient'){
            this.addPatient()
        }
    }

    help(){
        View.displayHelp()
    }

    loginEmployee(){
        Employee.readDataEmployee((cbRead) => {
            let username = this.command[1]
            let password = this.command[2]
            
            let dataMatch       = false
            let alreadyLogin    = false 
            let dataEmployees
            let userLogin
            
            for(let i = 0; i < cbRead.length; i++){
                if(cbRead[i].status == 1){
                    alreadyLogin = true
                    userLogin = cbRead[i]
                }
                if(cbRead[i].username == username && cbRead[i].password == password){
                    dataMatch     = true
                    dataEmployees = cbRead[i]
                }
            }

            if(dataMatch == true && alreadyLogin == false) {
                Employee.updateStatusLogin(dataEmployees, (cbMsg) =>{
                    View.displayStatusLogin(cbMsg)
                })
            } else if(dataMatch == false){
                View.displayStatusLogin("username or password did't match")
            } else {
                View.alreadyLogin(userLogin)
            }

        })
    }

    logoutEmployee(){
        Employee.readDataEmployee((cbRead) => {
            let dataEmployees
            let userLogout = false

            for(let i = 0; i < cbRead.length; i++){
                if(cbRead[i].status == 1){
                    userLogout = true
                    dataEmployees = cbRead[i]
                }
            }

            if(userLogout == true){
                Employee.logoutEmployee(dataEmployees, (cbMsg) => {
                    View.displayLogout(cbMsg)
                })
            } else {
                View.displayLogout('You have to login')
            }
        })
    }

    listEmployee(){
        Employee.readDataEmployee( (cbRead) =>{
            for(let i = 0; i < cbRead.length; i++){
                View.displayDataEmployees(cbRead[i].username, cbRead[i].name, cbRead[i].role, cbRead[i].date)
            }
        })
    }

    registerEmployee(){
        let username = this.command[1]
        let password = this.command[2]
        let name     = this.command[3]
        let role     = this.command[4]

        Employee.addDataEmployee(username, password, name, role, (cbRegister) => {
            View.displayInsertEmployee(cbRegister)
        })
    }

    addPatient(){
        Employee.readDataEmployee((cbRead) => {
            let first_name = this.command[1]
            let last_name  = this.command[2]
            let gender     = this.command[3]
            let diagnosis  = this.command[4]
            
            let addDataPatient = false

            for(let i = 0; i < cbRead.length; i++){
                if(cbRead[i].status == 1 && cbRead[i].role == 'doctor'){
                    addDataPatient = true
                }
            }

            if(addDataPatient == true){
                Patient.addDataPatient(first_name, last_name, gender, diagnosis, (cbAddPatient) => {
                    View.displayAddPatient(cbAddPatient)
                })
            } else {
                View.displayAddPatient('Only doctor can add patients')
            }

        })
    }

}

module.exports = Controller