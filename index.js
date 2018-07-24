const argv = process.argv
var command = argv[2]
var controller = require('./controller/controller')

switch (command) {
    case 'register': 
                    var username = argv[3]
                    var password = argv[4]
                    var position = argv[5]
                    controller.register(username,password,position)
                     break;

    case 'login'   : 
                    var username = argv[3]
                    var password = argv[4]
                    controller.login(username,password)
                    break;

     case 'addPatient':
                    var nama = argv[3]
                    var diagnosis = argv.slice(4)
                    controller.addPatient(nama,diagnosis)
                    break;
                    
    case 'logout'   :
                    controller.logout()
                    break;
    default        : console.log('a');
                     break;
}