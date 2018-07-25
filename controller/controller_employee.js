const modelEmployee = require('../model/model_employee')
const view = require('../view/view')

class ControllerEmployee {
  static register(...data) {
    modelEmployee.register([...data], message => {
      let msg = `Save data success {name: ${message.name}, username: ${message.username}, password: ${message.password}, position: ${message.position}}. Total Employee: ${message.total}`
      view.message(msg)
    })
  } 

  static login(...data) {
    modelEmployee.login([...data], (err, message) => {
      if (err) {
        view.messageErr(err.msgErr)
      } else {
        let msg = `User ${message.username} logged in successfully`
        view.message(msg)
      }
    })
  }

  static logout() {
    modelEmployee.logout((err, message) => {
      if (err) {
        view.messageErr(err.msgErr)
      } else {
        let msg = `User ${message.username} successfully logout`
        view.message(msg)
      }
    })
  }
}

module.exports = ControllerEmployee