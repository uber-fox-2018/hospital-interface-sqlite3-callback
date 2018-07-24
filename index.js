const Controller = require("./controller.js");

//commands 
let argv = process.argv.slice(2, process.argv.length);
let command = argv[0];
let username = argv[1];
let password = argv[2];
let role = argv[3];
let patientName = argv[1];
let diagnoses = argv.slice(2);

switch(command){
    case "register":
        Controller.addEmployees(username, password, role);
        break;
    case "login":
        Controller.login(username,password);
        break;
    case "addPatient":
        Controller.addPatients(patientName, diagnoses);
        break;
    case "logout":
        Controller.logoutUser(username, password);
        break;
    case "help":
        Controller.help();
        break;
    case undefined:
        console.log("\x1b[91mCommand not found!!\x1b[0m");
        Controller.help();
        break;
    default:
        console.log("\x1b[91mCommand not found!!\x1b[0m");
        Controller.help();
        break;
}