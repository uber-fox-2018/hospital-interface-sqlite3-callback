const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./hospital.db');

module.exports = db