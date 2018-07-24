const modelEmployee = require('../model/model_employee')
const view = require('../view/view')

class ControllerEmployee {
  static register(...data) {
    modelEmployee.register([...data], message => {
      view.message(message)
    })
  } 

  static login(...data) {
    modelEmployee.login([...data], message => {
      view.message(message)
    })
  }

  static logout() {
    modelEmployee.logout(message => {
      view.message(message)
    })
  }
}

module.exports = ControllerEmployee