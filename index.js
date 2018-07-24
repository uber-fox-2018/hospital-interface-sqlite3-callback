var argv = process.argv.slice(2)
let Controller = require('./controller')

class Interface {
    constructor(){
        this.data = new Controller()
    }

    execute(){
        let command = argv[0]
        if (command === 'register'){
            let username = argv[1]
            let pass = argv[2]
            let position = argv[3]
            this.data.addEmployee(username,pass,position)
        } else if (command === 'login'){
            let username = argv[1]
            let password = argv[2]
            this.data.loginEmployee(username,password)
        } else if (command === 'logout'){
            this.data.logOutEmployee()
        } else if (command === 'addpatient'){
            let name = argv[1]
            let diagnosis = argv.slice(2)
            this.data.addPatient(name,diagnosis)
        }
    }
}


let int = new Interface()

int.execute()