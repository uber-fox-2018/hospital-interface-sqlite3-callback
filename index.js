let Controller = require('./controller')
let argv = process.argv
let menu = argv[2]

if(menu === 'register'){
    let username = argv[3]
    let password = argv[4]
    let role = argv[5]
    Controller.c_register(username,password,role)
} else if (menu === 'login'){
    let username = argv[3]
    let password = argv[4]
    Controller.c_login(username,password)
} else if( menu === 'addPatient'){
    let name = argv[3]
    let diagnosis = argv[4]
    Controller.c_addPatient(name,diagnosis)

}else if(menu === 'logout'){
    let username = argv[3]
    Controller.c_logout(username)
}