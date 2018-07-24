const View = require('./view');

class LoginView extends View {
    constructor () {
        super();
    }

    displaySystemInUsed(username) {
        console.log(`Can't login. System is currently in used by ${username}`);
    }

    displayLoginFailed() {
        console.log(`Wrong username or password.`);
    }

    displayLoginSuccess(employee) {
        console.log(`User ${employee.username} login success.`);
        console.log(`Welcome, ${employee.name}`);
    }

    displayLogout() {
        console.log(`Logged out.`);
    }
}

module.exports = LoginView;