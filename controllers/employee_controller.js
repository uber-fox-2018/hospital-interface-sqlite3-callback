const DbContext = require('../models/dbcontext');
const EmployeeView = require('../views/employee_view');

class EmployeeController {
    constructor(connection) { 
        this._model = new DbContext(connection);
        this._view = new EmployeeView();
    }

    list() {
        this._model.employees.list((err, employees) => {
            if(err)
                this._view.displayError(err);
            else{
                employees.forEach(employee => {
                    this.employeeRoleHandler(employee, (err, employeeWithRole) => {
                        console.log(employeeWithRole);
                    });
                });
            }
        });
    }

    register(employeeName, username, password, roleName) {
        this.findRoleHandler(roleName, role => {
            let obj = { name: employeeName, username: username, password: password, roleId: role.id };
            this._model.employees.add(obj, (err, lastId) => { 
                if(err)
                    this._view.displayError(err);
                else {
                    this._model.employees.find(lastId, (err, employee) => {
                        this.employeeRoleHandler(employee, (err, employeeWithRole) => {
                            this._model.employees.count((err, total) => {
                                this._view.displayRegisterSuccess(employeeWithRole, total);
                            })
                        });
                    });
                }
            });
        });
    }

    findRoleHandler(roleName, callback) {
        this._model.roles.findByName(roleName, (err, role) => {
            if (err)
                console.log(err);
            else {
                if(!role.id)
                    console.log(`Role is not exists`);
                else
                    callback(role);
            }
        });
    }

    employeeRoleHandler(employee, callback) {
        this._model.roles.find(employee.roleId, (err, role) => {
            employee.role = role;
            callback(err, employee);
        });
    }

    initialize() {
        this._model.initialize();
    }

    help() {
        this._view.displayHelp();
    }
}

module.exports = EmployeeController;