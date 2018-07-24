const Model = require('./model.js');

class Controller {
    constructor() {
        this.model = new Model.employee        
    }

    register() {
        
        this.model.register()
    }
}

module.exports = Controller