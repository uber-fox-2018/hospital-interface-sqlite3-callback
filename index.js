const args = process.argv.slice(2)
const command = args[0]
const input = process.argv.slice(3)
const inputDiagnose = process.argv.slice(4)
const ControllerEmployee = require('./controller/employee')
const ControllerPatient = require('./controller/patient')


if(command === "register" && input[0] !== undefined && input[1] !== undefined && input[2] !== undefined){
    ControllerEmployee.registerEmployee(input[0],input[1],input[2])
}else if(command === 'login' && input[0] !== undefined && input[1] !== undefined){
    ControllerEmployee.loginEmployee(input[0],input[1])
}else if(command === 'logout' && input[0] !== undefined){
    ControllerEmployee.logoutEmployee(input[0])
}else if(command === 'addPatient' && input[0] !== undefined && inputDiagnose !== undefined){
    ControllerPatient.addPatient(input[0],inputDiagnose)
}
