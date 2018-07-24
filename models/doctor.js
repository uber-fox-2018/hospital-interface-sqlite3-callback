const Employee = require('./employee');

class Doctor extends Employee {
    constructor() {
        super();
        this.patients = [];
    }

    addPatient(patient) {
        this.patients.push(patient);
    }
}