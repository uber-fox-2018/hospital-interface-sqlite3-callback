const [ command, ...args ] = process.argv.slice(2)
const controllerEmployee = require('./controller/controller_employee')
const controllerPatient = require('./controller/controller_patient')
const controllerMenuHelp = require('./controller/controller_menu_help')

switch(command) {
  case 'register': {
    controllerEmployee.register(...args)
    break
  }
  case 'login': {
    controllerEmployee.login(...args)
    break
  }
  case 'addPatient': {
    controllerPatient.addPatient(...args)
    break
  }
  case 'logout': {
    controllerEmployee.logout()
    break
  }
  default: {
    controllerMenuHelp.showHelp()
  }
}