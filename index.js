const Controller = require('./controller')
const argv = process.argv.slice(2)

let command = argv[0]
let username = argv[1]
let password = argv[2]
let role = argv[3]
let patient = argv[1]
let diagnosis = argv.slice(2)

if (command == 'register'){
    Controller.registerEmployee(username, password, role)
}else if (command == 'login'){
    Controller.loginEmployee(username, password)
}else if (command == 'addPatient'){
    Controller.addPatient(patient, diagnosis)
}else if (command == 'logout'){
    Controller.logoutEmployee(username)
}