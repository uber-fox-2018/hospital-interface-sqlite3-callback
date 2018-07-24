const db = require(`./db.js`)

db.serialize(function() {
	db.run("CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR,password VARCHAR,position TEXT,loginStats INTEGER)");
	db.run("CREATE TABLE IF NOT EXISTS patiens(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR,age INTEGER,diagnose TEXT)");
});

tableCreator = console.log(``);
module.exports = tableCreator
