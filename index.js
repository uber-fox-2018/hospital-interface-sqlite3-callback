const argv = process.argv.slice(2);

const Controller = require('./controller.js')

class Route {
    constructor(input) {
        this._argv = input
        this.routes()
    }

    routes() {
        let cmd = this._argv[0];
        let ctrl = new Controller(this._argv);
        switch (cmd) {
            case 'register':
                ctrl.register();
                break;
            case 'login':
                ctrl.login(this.argv);
                break;
            case 'logout':
                ctrl.logout();
                break;
            // case 'register':
            //     ctrl.register();
            //     break;
            default:
                break;
        }
    }

}

new Route(argv)