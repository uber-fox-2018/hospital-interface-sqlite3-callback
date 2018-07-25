const modelPatient = require('../model/model_patient')
const view = require('../view/view')

class ControllerPatient {
  static addPatient(...data) {
    modelPatient.addPatient([...data], (err, message) => {
      if (err) {
        view.messageErr(err.message)
      } else {
        let msg = `Data pasien berhasil ditambahkan. Total data pasien: ${message.totalPatient}`
        view.message(msg)
      }
    })
  }
}

module.exports = ControllerPatient