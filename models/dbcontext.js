const sqlite = require('sqlite3').verbose();

const EmployeeDbSet = require('./employee_dbset');
const RoleDbSet = require('./role_dbset');
const LoginDbSet = require('./login_dbset');
const PatientDbSet = require('./patient_dbset');

const setup = require('./setup');
const seed = require('./seed');

class DbContext {
    constructor(connection) {
        this.connection = connection;
        this._db = new sqlite.Database(connection);
    }

    initialize() {
        this._db.serialize(() => {
            setup(this._db);
            seed(this._db);
        });
    }

    get employees() {
        return new EmployeeDbSet(this._db);
    }

    get roles() {
        return new RoleDbSet(this._db);
    }

    get logins() {
        return new LoginDbSet(this._db);
    }

    get patients() {
        return new PatientDbSet(this._db);
    }
}

module.exports = DbContext;
