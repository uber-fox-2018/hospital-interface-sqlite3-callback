const View = require('./view');

class EmployeeView extends View {
    constructor() { 
        super();
    }
    displayRegisterSuccess(employee, totalEmployee) {
        console.log(`Success.`);
        console.log(`${employee.name} is registered as ${employee.role.name}`);
        console.log(`Total employee : ${totalEmployee}`);
    }
}

module.exports = EmployeeView;