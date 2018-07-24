const Controller = require('./controller')
const argv    = process.argv
const command = argv[2];

if (command == 'register') {
    let username = argv[3];
    let password = argv[4];
    let position = argv[5];
    Controller.register(username,password,position)
}else if (command == 'login') {
    let username = argv[3];
    let password = argv[4];
    Controller.login(username,password)
}else if (command == 'addPatient') {
    let patient = argv[3]
    let diagnosis = argv.slice(4)
    Controller.addPatient(patient,diagnosis)
}else if (command == 'logout') {
    let username = argv[3]
    Controller.logout(username)
}