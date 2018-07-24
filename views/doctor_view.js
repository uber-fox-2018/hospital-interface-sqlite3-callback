const View = require('./view');

class DoctorView extends View {
    constructor() {
        super();
    }

    displayNotAuthorized() {
        console.log(`You are not authorized to add patient.`);
    }

    displayAddPatientSuccess(patient, totalPatient) {
        console.log(`Patient ${patient.name} data is saved.`);
        console.log(`Total patient : ${totalPatient}`);
    }
}

module.exports = DoctorView;