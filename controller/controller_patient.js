const modelPatient = require('../model/model_patient')
const view = require('../view/view')

class ControllerPatient {
  static addPatient(...data) {
    modelPatient.addPatient([...data], message => {
      view.message(message)
    })
  }
}

module.exports = ControllerPatient