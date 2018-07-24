const Controller = require('./controller.js')

const argv = process.argv
const execute = argv[2]
const input = argv.slice(3)


if (execute == 'register'){
    Controller.registerEmployee(input[0], input[1], input[2])
}else if (execute == 'login'){
    Controller.loginEmployee(input[0], input[1])
}else if (execute == 'logout'){
    Controller.logout_employee(input[0])
}else if (execute == 'addPatient') {
    Controller.addPatient(input[0], argv.slice(4))
}else{
    console.log(`Please follow command below :`);
    console.log(`- register <username> <password> <job>`)
    console.log(`- login <username> <password>`)
    console.log(`- logout`)
    console.log(`- addPatient <patient_name> <diagnosis> <diagnosis...n>`)
}