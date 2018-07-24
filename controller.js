const Model = require('./model.js');
const View = require('./view.js')

class Controller {
    constructor(input) {
        this.employee_model = new Model.employee
        this.input = input;        
    }

    register(a, b) {
        this.input = a
        // this.employee_model.register()
        console.log(this.input)
    }

    // proses login
    login() {
        // cek apakah ada yang login
        this.employee_model.checkLogin( (loginData) => {
            var msg = '';
            // jika ada yang login cek apakah itu dia sendiri || orang lain || kosong
            if(loginData == undefined) {
                this.employee_model.login(this.input[1], this.input[2], (employee) => {
                    this.employee_model.doLogin(employee);
                    msg = `Welcome ${ this.input[1] }`;
                    View.DisplayMsg(msg)
                });
            } else if( loginData.username == this.input[1] ) {
                msg = `You are logged in ${ this.input[1] }`;
                View.DisplayMsg(msg)
            } else if( loginData.username != this.input[1] ) {
                msg = `Another user is logged in, \nif you want to continue, please logout!`;
                View.DisplayMsg(msg)
            } 
            
        })
    }

    // proses logout
    logout() {
        this.employee_model.logout()
        let msg = `Thank you, you sudah logout`;
        View.DisplayMsg(msg)
    }

    // register just access by admin
    register() {
        // cek ada yang login 
        this.employee_model.checkLogin( (loginData) => {
            var msg = ''
            if(loginData == undefined) {
                msg = `Please, login before`;
                View.DisplayMsg(msg)
            } else if(loginData.role !== 'admin') {
                msg = `Sorry, You dont have authority for access`;
                View.DisplayMsg(msg)
            } else if(this.input[1] == undefined || this.input[2] == undefined || this.input[3] == undefined){
                msg = `Username, password, and role is required`;
                View.DisplayMsg(msg)
            } else {
                this.employee_model.register(this.input[1], this.input[2], this.input[3]);
                msg = `Username: ${ this.input[1] }, success for added`;
                View.DisplayMsg(msg)
            }
        })

        // cek apakah admin yang login? jika admin lanjutkan register
    }
}

module.exports = Controller