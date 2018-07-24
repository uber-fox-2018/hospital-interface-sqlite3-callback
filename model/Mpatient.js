const db = require('../config.js');

class Patient {
	constructor(id, name, diagnosis) {
		this.id = id
		this.name = name
		this.diagnosis = diagnosis
		this.table = 'patients'
	}

	// add patient by docter
	addpatient(name, diagnosis, cb) {
		this.name = name;
		this.diagnosis = diagnosis;

		let query = `INSERT INTO ${ this.table }(name, diagnosis) VALUES("${this.name}", "${this.diagnosis}")`;
		db.run(query, (err) => {
			cb(true);
		})
	}
	
	// list patient
	listPatient(cb) {
		let query = `SELECT * FROM ${this.table}`;
		db.all(query, (err, data) => {
			cb(data)
		})
	}
}

module.exports = Patient