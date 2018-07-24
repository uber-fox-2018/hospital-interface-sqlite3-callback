class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
	constructor(username, password, role) {
		this.username = username
		this.password = password
		this.role = role
	}
	
	register() {
		let stmt = `INSERT INTO employees (username, password, role) VALUES(?, ?, ?)`;
		console.log(stmt)
	}	  

}

module.exports = {
	employee	: Employee,
	patient 	: Patient
};