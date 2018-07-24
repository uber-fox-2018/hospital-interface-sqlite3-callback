class View {
    constructor() { }
    displayHelp() {
        console.log(`$ node index login <username> <password> #login to system (1 user at a time)`);
        console.log(`$ node index logout #logout from system`);
        console.log(`$ node index register <name> <username> <password> <position> #register employee to the system`);
        console.log(`$ node index addPatient <patient_name> ...<diagnosis> #add a patient to the logged in doctor (doctor only)`);
        console.log(`$ node index init #initialize database (setup and seed)`)
    }
    displayError(err) {
        console.log(`Oops... Something went wrong.`, err);
    }
}

module.exports = View;