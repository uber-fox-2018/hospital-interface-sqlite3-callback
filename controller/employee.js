const Model = require('../model/employee')
const View = require('../view/employee')

class Controller{

    static registerEmployee(username, password, position){
        Model.registerEmployee(username, password, position,function(username, password, position,totalEmployee){
            View.showRegister(username, password, position,totalEmployee)
        })
    }

    static loginEmployee(username,password){
        Model.loginEmployee(username,password,function(err,username){
            if(err){
                View.showLoginError(err)
            }else{
                View.showLoginSuccess(username)
            }
        })
    }

    static logoutEmployee(username){
        Model.logoutEmployee(username,function(err,username){
            if(err){
                View.showLogoutError(err)
            }else{
                View.showLogoutSuccess(username)
            }
        })
    }



}
module.exports = Controller