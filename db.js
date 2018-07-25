const Sqlite3 = require('sqlite3').verbose()
const db = new Sqlite3.Database('hospital.db')

module.exports = db