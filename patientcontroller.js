const View = require('./view.js');
const Patient = require('./patientmodel.js');

class PatientController {

    static addPatients(name, diagnosis) {
        Patient.addPatients(name,diagnosis, function (err, data) {
            if (err) {
                View.displayError(err);
            } else {
                let output = `Data patient saved! Total patient(s): ${data}`;
                View.displayMessage(output);
            }
        })
    }
}

module.exports = PatientController;