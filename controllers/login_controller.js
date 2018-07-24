const DbContext = require('../models/dbcontext');
const LoginView = require('../views/login_view');

class LoginController {
    constructor(connection) {
        this._model = new DbContext(connection);
        this._view = new LoginView();
    }

    login(username, password) {
        this._model.logins.isLogin((err, isLogin, employeeId) => {
            if (isLogin) {
                this._model.employees.find(employeeId, (err, employee) => {
                    this._view.displaySystemInUsed(employee.username);
                });
            } else {
                this._model.employees.authenticate(username, password, (err, employee) => {
                    if(!employee.id)
                        this._view.displayLoginFailed();
                    else {
                        this._model.logins.login(employee.id, err => {
                            this._view.displayLoginSuccess(employee);
                        });
                    }
                });
            }
        });
    }

    logout() {
        this._model.logins.isLogin((err, isLogin, employeeId) => {
            if(isLogin) {
                this._model.logins.logout(err => {
                    this._view.displayLogout();
                });
            }
        })
    }
}

module.exports = LoginController;
