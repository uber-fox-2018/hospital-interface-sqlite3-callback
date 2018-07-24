let db = require('./db.js')
let Employee = require('./modelEmployee.js')
let Patient = require('./modelPatient')
let View = require('./view.js')


class Controller {
    static c_register(username,password,role){
        Employee.m_register(username,password,role, function(err,data){
            if (err){
                View.v_error(err)
            }else{
                View.v_register(data)
            }
        })
    }

    static c_login(username,password){
        Employee.m_login(username,password,function(err,data){
            if (err){
                View.v_error(err)
            } else {
                View.v_login(data)
            }
        })
    }

    // static c_addPatient(name,diagnosis){

    //     Patient.m_addPatient(name, diagnosis, function(err,data){
    //         if(err){
    //             View.v_error(err)
    //         } else {
    //             View.v_addPatient(data)
    //         }
    //     })
    // }

    static c_logout(username){
        Employee.m_logout(username,function(err,data){
            if(err){
                View.v_error(err)
            } else {
                View.v_logout(data)
            }
        })
    }

}

module.exports = Controller