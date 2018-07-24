
const view = require('../view/view')
const employee = require('../model/modelEmployee')
const patient = require('../model/modelPatient')

class Controller{
    static register(username, password, position){
        employee.register(username, password, position,function(username, password, position, data){
            view.showMessage(`save data succes {"username":"${username}","password":"${password}","position":"${position}"}. Total Employee : ${data}`)
        })
    }

    static login(username, password){
        employee.login(username, password, function(data){
            if(data > 0){
                view.showMessage(`mohon maaf user lain sedang login`)
            }else{
                view.showMessage(`user ${data.username} logged in succesfully`)
            }
        })
    }

    static addPatient(nama, diagnosis){
        employee.cekLogin(function(data){
           if(data === true){
                patient.addPatient(nama, diagnosis,function(data){
                    view.showMessage(`data pasien berhasil ditambahkan, total data pasien : ${data.total}`)
                })
           }else{
               view.showMessage(`mohon maaf, anda tidak memiliki akses untuk add patient`)
           }
        })
    }

    static logout(){
        employee.logout(function(data){
            if(data === true) {
                view.showMessage(`anda berhasil logout`)
            }else{
                view.showMessage(`anda sudah logout`)
            }
        })
    }
}

module.exports = Controller