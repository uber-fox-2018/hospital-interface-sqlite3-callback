const argv = process.argv.slice(2)
const command = argv[0]
const input = argv
const Controller = require('./Controller/controller')


class Hospital {
    static selectorMenu (command, input) {
        switch (command) {
            case undefined:
            Controller.unknownCommand()
            break;
            case 'help':
            Controller.menu()
            break;
            case 'register':
            var username = input[1]
            var password = input[2]
            let role = input[3]
            Controller.registerEmployee(username, password, role)
            break;
            case 'login':
            var username = input[1]
            var password = input[2]
            Controller.loginEmployee(username, password)
            break;
            case 'logout':
            var username = input[1]
            Controller.logoutEmployee(username)
            break;
            case 'addPatient':
            var namePatient = input[1]
            var diagnosis = input.slice(2).join(',')
            Controller.addPatient(namePatient, diagnosis)
            default:
            Controller
        }
    }
}


Hospital.selectorMenu(command, input)