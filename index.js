let Control = require('./controller.js')
let command = process.argv[2]
let input = process.argv.slice(3)
if(command == 'createTable'){
    Control.createTable()
}
else if(command == 'initData'){
    Control.initData()
}
else if(command == 'registration'){
    Control.registration(input)
}
else if(command == 'login'){
    Control.login(input)
}
else if(command == 'addPatient'){
    let diagnosis = input.slice(1)
    Control.addPatient(input,diagnosis)
}
else if(command == 'logout'){
    Control.addPatient(input)
}