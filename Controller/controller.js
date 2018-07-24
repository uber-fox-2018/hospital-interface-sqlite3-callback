const Model = require('../Model/model')
const View = require('../View/view')



class Controller {
    static unknownCommand() {
        View.displayMessage(`
        $ node index.js help
        `, null)
    }

    static menu() {
        View.displayMessage(`
        $ node index.js register <Username> <Password> <Role>
        $ node index.js login <Username> <Password>
        $ node index.js addPatient <name_patient> <diagnosis> .. .. ..
        $ node index.js logout <Username>
        `, null)
    }

    static registerEmployee(username, password, role) {
        Model.registerEmployee(username, password, role, (msg, err) => {
          err = (null) ? View.displayMessage(msg) : View.displayMessage(err)
        })
    }

    static loginEmployee(username, password) {
        Model.loginEmployee(username, password, (msg) => {
            View.displayMessage(msg)
        })
    }

    static logoutEmployee(username) {
        Model.logoutEmployee(username, (msg) => {
            View.displayMessage(msg)
        })
    }

    static addPatient(namePatient, diagnosis) {
        Model.addPatient(namePatient, diagnosis, (msg) => {
            View.displayMessage(msg)
        })
    }
}



module.exports = Controller