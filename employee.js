const db = require('./setup')

class Employee {

    static readDataEmployee(cbreadDataEmployee){
        let query = `SELECT * FROM employees`
        db.all(query, function(err, data){
            cbreadDataEmployee(data)
        })
    }

    static updateStatusLogin(dataUser, cbMsg){
        let query = `UPDATE employees SET status = 1 WHERE id = ${dataUser.id}`
        let message
        db.run(query, function(err) {
            message = 'login success'
            cbMsg(message)
        })
    }

    static logoutEmployee(dataUser, cbMsg){
        let query = `UPDATE employees SET status = 0 WHERE id = ${dataUser.id}`
        let message
        db.run(query, function(err){
            message = 'logout success'
        })
    }

    static addDataEmployee(username, password, name, role, cbAddEmployee){
        let fulldate = new Date()
        let date     = fulldate.toLocaleDateString()
        let query = `INSERT INTO employees (username, password, name, role, date)
                     VALUES ("${username}", "${password}", "${name}", "${role}", "${date}")`
        let message
        db.serialize(() => {
            db.run(query, function(err){
                if(!err) {
                    message = 'Insert Data Employee Success'
                } else {
                    message = 'Insert Data Employee Failed'
                }
                cbAddEmployee(message)
            })
        })
    }

    
}

module.exports = Employee