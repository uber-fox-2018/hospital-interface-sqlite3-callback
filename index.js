const Controller = require('./controllers/controller')

const argv = process.argv
const command = argv[2]

if (command == 'register') {
    return Controller.register(argv[3], argv[4], argv[5])
} else if (command == 'login') {
    return Controller.login(argv[3], argv[4]) 
} else if (command == 'logout') {
    return Controller.logout(argv[3])
} else if (command == 'addPatient') {
    return Controller.addPatient(argv[3], argv.slice(4))
}