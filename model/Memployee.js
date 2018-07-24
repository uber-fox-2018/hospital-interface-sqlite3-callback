const db = require('../config.js');

class Employee {
	constructor(username, password, role) {
		this.table = 'employees';
		this.username = username
		this.password = password
		this.role = role
	}

	listEmployees(cb) {
		let query = `SELECT * FROM ${this.table}`;
		db.all(query, (err, data) => {
			cb(data)
		})
	} 

	// ambil data, username dan password yang dientrikan 
	login(username, password, cbLogin) {
		this.username = username
		this.password = password
		let query = `SELECT * FROM ${this.table} WHERE username = "${this.username}" AND password = ${this.password}`;
		db.get(query, (err, employee) => {
			if(!err) {
				cbLogin(employee)
			}
		})
	}

	// proses mengubah login jadi true
	doLogin(employee) {
		let id = employee.id;
		let query = `UPDATE ${ this.table } SET login = "true" WHERE id = ${ id }`;
		db.run(query, (err) => { })
	}

	// cek apakah ada yang login
	checkLogin(cb) {
		let query = `SELECT * FROM ${this.table} WHERE login = "true"`;
		db.get(query, (err, data) => {
			if(!err) {
				cb(data)
			}
		})
	}

	// ubah data login jadi false
	logout() {
		let query = `UPDATE ${ this.table } SET login = "false"`;
		db.run(query, (err) => {
		})
	}

	// register
	register(username, password, role, cb) {
		this.username = username;
		this.password = password;
		this.role = role;

		let query = `INSERT into ${ this.table }(username, password, role) VALUES("${this.username}", "${this.password}", "${this.role}")`;
		db.run(query, (err) => {

		})
	}

}

module.exports = Employee