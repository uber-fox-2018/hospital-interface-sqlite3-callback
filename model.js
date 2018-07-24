const fs = require ("fs");
const db = require('./setup.js')

class Patient{
    constructor(id, name, diagnose){
        this.id = id
        this.name = name
        this.diagnose = diagnose
    }
}

class Employee{
    constructor(username, password, role){
        this.username = username
        this.password = password
        this.role = role
        this.isLoggin = false
    }

}

class Model{
    //register employee
    static addEmployee(username, password, role, cb){
        let addEmployees = `INSERT INTO employees(username, password, role) VALUES($name, $pass , $role)`;
        let getLastID = `SELECT max(ID) as lastID FROM employees`;
       
        db.serialize(()=>{
            db.run(addEmployees, {$name:username, $pass:password, $role:role}, (err)=>{
                if(err) cb("error", 0);
                db.serialize(()=>{
                    db.get(getLastID, (err, data)=>{
                        if(err) throw err
                        db.serialize(()=>{
                            let getEmployee = `SELECT username, password, role FROM employees WHERE ID = ${data.lastID}`
                            db.get(getEmployee, (err, row)=>{
                                if(err) throw err
                                cb(row, data.lastID);
                            })
                        })
                    });
                })
            })
            
        })
    }

    static login(username, password, cb){
        let checkOnlineUser = `SELECT * FROM employees WHERE isLogin = "true"`;
        let getUserNamePass = `SELECT * FROM employees WHERE username = "${username}" AND password = "${password}"`
        let isLoggin = `UPDATE employees SET isLogin = "true" WHERE username =  "${username}"`; 
        let noOnlineUser = true;
        db.serialize(()=>{
            db.all(checkOnlineUser, (err, user)=>{
                if(err) throw err
                if(user.length){
                    noOnlineUser = false;
                }
                if(!noOnlineUser && user[0].username !== username){
                    cb("full");
                }else if(!noOnlineUser && user[0].username === username && user[0].password === password){
                    cb("still");
                }else{
                    db.serialize(()=>{
                        db.get(getUserNamePass, (err, data)=>{
                            if(err) cb(false)
                            if(data===undefined){
                                cb(false);
                            }else{
                                cb(data);
                                //then change the isLogin status from "false" to "true"
                                db.serialize(()=>{
                                    db.run(isLoggin, (err)=>{
                                        if(err) cb(false)
                                    }) 
                                })
                            }
                        })          
                    })
                }
            }) 
        })
    }

    static addPatient(name, diagnoses, cb){
        let joinedDiagnoses= diagnoses.join(", ");
        let addPatients = `INSERT INTO patients (name, diagnoses) VALUES ("${name}", "${diagnoses}")`;
        let getLastID = `SELECT max(ID) as lastID FROM patients`;
        let onlineDoctor = `SELECT * FROM employees WHERE role = "dokter" AND isLogin = "true"`
        db.serialize(()=>{
            db.get(onlineDoctor, (err, doctor)=>{
                if(doctor !== undefined){
                    db.serialize(()=>{
                        db.run(addPatients,[],(err)=>{
                            if(err) throw err
                            db.serialize(()=>{
                                db.get(getLastID, (err, data)=>{
                                    if(err) throw err
                                    cb(data.lastID)
                                })
                            })
                
                        })
                    })
                }else{
                    cb(false);
                }
            })
        })
       
    }

    static logout(username, password, cb){
        let updateStatus = `UPDATE employees SET isLogin = "false" WHERE username =  "${username}" AND password = "${password}" AND islogin = "true"`;
        db.serialize(()=>{
            db.run(updateStatus,function(err){
               if(!err){
                   cb(this.changes);
               }
            })
        })
        
    }
}

module.exports = Model;


