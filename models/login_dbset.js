const DbSet = require('./dbset');

class LoginDbSet extends DbSet {
    constructor(db) {
        super(db, 'roles');
    }

    isLogin(callback) {
        this.lastLogin((err, row) => {
            if(!row) {
                callback(err, false);
            }
            else{
                callback(err, true, row.employeeId);
            }
        });
    }

    login(employeeId, callback) {
        let sql = `INSERT INTO logins (employeeId, loginTime) VALUES (?,?);`;
        let params = [employeeId, new Date()]
        this._db.run(sql, params, err => callback(err));
    }

    logout(callback) {
        this.lastLogin((err, row) => {
            let sql = `UPDATE logins SET logoutTime = ? WHERE id = ?`;
            let params = [new Date(), row.id];
            this._db.run(sql, params, err => callback(err));
        })
    }

    lastLogin(callback) {
        let sql = `SELECT * FROM logins WHERE logoutTime IS NULL`;
        this._db.get(sql, [], (err, row) => {
            callback(err, row);
        });
    }
}

module.exports = LoginDbSet;