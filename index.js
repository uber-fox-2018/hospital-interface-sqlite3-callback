const EmployeeController = require('./controllers/employee_controller');
const LoginCotroller = require('./controllers/login_controller');
const DoctorController = require('./controllers/doctor_controller');

let dbConnection = './hospital.db';
let employeeController = new EmployeeController(dbConnection);
let loginController = new LoginCotroller(dbConnection);
let doctorController = new DoctorController(dbConnection);

let commands = process.argv.slice(2);

switch (commands[0]) {
    case 'login':
        loginController.login(commands[1], commands[2]);
        break;
    case 'logout':
        loginController.logout();
        break;
    case 'register':
        employeeController.register(commands[1], commands[2], commands[3], commands[4]);
        break;
    case 'addPatient':
        doctorController.addPatient(commands[1], commands.slice(2));
        break;
    case 'init':
        employeeController.initialize();
        break;
    default:
        employeeController.help();
        break;
}

