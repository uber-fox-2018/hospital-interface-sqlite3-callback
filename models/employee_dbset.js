const DbSet = require('./dbset');
const Employee = require('./employee');

class EmployeeDbSet extends DbSet {
    constructor(db) {
        super(db, 'employees');
    }

    list(callback) {
        let sql, employees = [];
        sql = `SELECT * FROM ${this.table_name}`;
        this._db.all(sql, [], (err, rows) => {
            rows.forEach(row => {
                employees.push(Object.assign(new Employee(), row));
            });
            callback(err, employees);
        });
    }

    find(id, callback) {
        let sql, employee;
        sql = `SELECT * FROM ${this.table_name} WHERE id = $id`;
        this._db.get(sql, { $id: id }, (err, row) => {
            employee = Object.assign(new Employee(), row);
            callback(err, employee);
        });
    }

    add(obj, callback) {
        let sql, param;
        sql = `INSERT INTO ${this.table_name} (name, username, password, roleId) VALUES (?, ?, ?, ?)`;
        param = [obj.name, obj.username, obj.password, obj.roleId];
        this._db.run(sql, param, function(err) {
            callback(err, this.lastID);
        });
    }

    count(callback) {
        this._db.get(`SELECT COUNT (*) as count from ${this.table_name}`, [], (err, row) => {
            callback(err, row.count);
        });
    }

    authenticate(username, password, callback) {
        let sql, employee;
        sql = `SELECT * FROM ${this.table_name} WHERE username = ? AND password = ?`;
        this._db.get(sql, [username, password], (err, row) => {
            employee = Object.assign(new Employee(), row);
            callback(err, employee);
        });
    }
}

module.exports = EmployeeDbSet;

