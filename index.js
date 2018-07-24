const argv = process.argv.slice(2);
const db = require('./config.js');
const Controller = require('./controller.js')

class Route {
    constructor(input) {
        this._argv = input
        this.routes()
    }

    routes() {
        let cmd = this._argv[0];
        let ctrl = new Controller;
        switch (cmd) {
            case 'register':
                ctrl.register();
                break;
        
            default:
                break;
        }
    }

}

new Route(argv)