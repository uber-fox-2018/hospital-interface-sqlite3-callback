const EmployeeController = require('./employeecontroller');
const PatientController = require('./patientcontroller');

const argv = process.argv;
var command = argv[2];

if (command == 'register') {
    let name = argv[3];
    let username = argv[4];
    let password = argv[5];
    let position = argv[6];
    EmployeeController.registerEmployee(name, username, password, position);

} else if (command == 'login') {
    let username = argv[3];
    let password = argv[4];
    EmployeeController.loginEmployee(username, password);

} else if (command == 'addPatient') {
    let name = argv[3];
    let diagnosis = argv.slice(4);
    PatientController.addPatients(name, diagnosis);

} else if (command == 'logout') {
    EmployeeController.logout();
}
