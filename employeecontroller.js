const View = require('./view.js');
const Employee = require('./employeemodel.js');

class EmployeeController {

    static registerEmployee(name, username, password, position) {
        Employee.registerEmployee(name, username, password, position, function(err, data) {
            if (err) {
                View.displayError(err);
            } else {
                let output = `Save data success for "${data[0].name}"! {"username": ${data[0].username}, "password": ${data[0].password}, "position": ${data[0].position}}. Total employee(s): ${data[1]}`
                View.displayMessage(output);
            }
        })
    }


    static loginEmployee(username, password) {
        Employee.loginEmployee(username, password, function (err, loginCheck) {
            if (err) {
                View.displayError(err);
            } else {
                let strOutput = `User logged in successfully!`
                View.displayMessage(strOutput);
            }
        })
    }

    static logout() {
        Employee.logout(function (logout) {
            let output = 'User successfully logged out.';
            View.displayMessage(output);
        })
    }

}

module.exports = EmployeeController;