const db = require('./db')



class Employee {
    constructor() {

    }

    static add(username,pass,position,cb){
        let addEmployee = `
        INSERT INTO employees (position, username, password, loginstatus) 
        VALUES ("${position}", "${username}", "${pass}",0)
        `
        db.run(addEmployee, function(err){
            if (err){
                cb('failed to add data')
            }
            cb(`Save data success ${position} ${username} \nTotal employee : ${this.lastID}`)
        })
    }


    static getLoginstatus(cb){
        let loginstats = `select loginstatus, position from employees`
        db.all(loginstats,function(err,data){
            cb(data)
        }) 
    }
    
    
    static login(username,password,cb){

        Employee.getLoginstatus(function(data){
            let stats = data
            let inUse = false
            stats.forEach(function(stat){
                if (stat.loginstatus === 1){
                    inUse = true
                }
            })

            if (!inUse){
                let queryCheckMatch = `
                SELECT * FROM employees 
                WHERE username = "${username}"
                AND password = "${password}"
                `
                db.get(queryCheckMatch, function(err, data){
                    if (err) throw err
                    if (data === undefined){
                        cb(null,`wrong password or username`)
                    } else {
                        let updateStatusQuery = `
                        UPDATE employees 
                        SET loginstatus = 1
                        WHERE username = "${username}"
                        `
                        db.run(updateStatusQuery,function(err){
                            if (err) throw err
                            cb(null,`user ${username} logged in successfully`)
                        })
                    }
                })
            } else {
                cb(`other user is currently logged in`, null)
            }

        })
    }


    static logOut(){
        let queryLogout = `UPDATE employees SET loginstatus = 0`
        db.run(queryLogout,function(err){
            if (err) throw err
        })
    }
}


  
module.exports = Employee