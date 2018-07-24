const DbSet = require('./dbset');
const Role = require('./role');

class RoleDbSet extends DbSet {
    constructor(db) {
        super(db, 'roles');
    }

    list(callback) {
        let sql, employees = [];
        sql = `SELECT * FROM ${this.table_name}`;
        this._db.all(sql, [], (err, rows) => {
            rows.forEach(row => {
                employees.push(Object.assign(new Role(), row));
            });
            callback(err, employees);
        });
    }

    find(id, callback) {
        let sql, employee;
        sql = `SELECT * FROM ${this.table_name} WHERE id = $id`;
        this._db.get(sql, { $id: id }, (err, row) => {
            employee = Object.assign(new Role(), row);
            callback(err, employee);
        });
    }

    findByName(name, callback) {
        let sql = `SELECT * FROM ${this.table_name} WHERE name = ?`;
        this._db.get(sql, [name], (err, row) => {
            callback(err, Object.assign(new Role(), row));
        });
    }
}

module.exports = RoleDbSet;