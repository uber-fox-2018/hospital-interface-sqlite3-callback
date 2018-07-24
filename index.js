const Controller = require('./controller')
const argv = process.argv.slice(2)

let command = new Controller(argv)

