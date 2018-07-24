const Memployee = require('./model/Memployee');
const Mpatient = require('./model/Mpatient');

const View = require('./view.js')

class Controller {
    constructor(input) {
        this.employee_model = new Memployee
        this.patient_model = new Mpatient
        this.input = input;        
    }

    // list employees
    employees() {
        this.employee_model.listEmployees((data) => {
            View.DisplayData(data)
        })
    }

    // proses login
    login() {
        let username = this.input[1];
        let password = this.input[2]
        // cek apakah ada yang login
        this.employee_model.checkLogin( (loginData) => {
            var msg = '';
            // jika ada yang login cek apakah itu dia sendiri || orang lain || kosong
            if(loginData == undefined) {
                this.employee_model.login(username, password, (employee) => {
                    this.employee_model.doLogin(employee);
                    msg = `Welcome ${ username }`;
                    View.DisplayMsg(msg)
                });
            } else if( loginData.username == username ) {
                msg = `You are logged in ${ username }`;
                View.DisplayMsg(msg)
            } else if( loginData.username != username ) {
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
        let username = this.input[1];
        let password = this.input[2];
        let role = this.input[3];
        // cek ada yang login 
        this.employee_model.checkLogin( (loginData) => {
            var msg = ''
            // cek apakah admin yang login? jika admin lanjutkan register
            if(loginData == undefined) {
                msg = `Please, login before`;
                View.DisplayMsg(msg)
            } else if(loginData.role !== 'admin') {
                msg = `Sorry, You dont have authority for access`;
                View.DisplayMsg(msg)
            } else if(username == undefined || password == undefined || role == undefined){
                msg = `Username, password, and role is required`;
                View.DisplayMsg(msg)
            } else {
                this.employee_model.register(username, password, role);
                msg = `Username: ${ username }, success for added`;
                View.DisplayMsg(msg)
            }
        })        
    }

    //////////////////////////////////Berhubungan dengan model Patient/////////////////////////////////////////

    // tambah data pasien
    addPatient() {
        let name = this.input[1];
        let diagnosis = this.input.slice(1);
        // cek apakah sudah login
        this.employee_model.checkLogin( (loginData) => {
            var msg = ''
            // cek apakah docter yang login? jika docter lanjutkan register
            if(loginData == undefined) {
                msg = `Please, login before for entry patient data`;
                View.DisplayMsg(msg)
            } else if(loginData.role !== 'docter') {
                msg = `Sorry, You dont have authority for access`;
                View.DisplayMsg(msg)
            } else if(name == undefined || diagnosis == undefined){
                msg = `Name and diagnosiss is required`;
                View.DisplayMsg(msg)
            } else {
                this.patient_model.addpatient(name, diagnosis, (data) => {
                    let msg = `data, success for added`;
                    View.DisplayMsg(msg)
                });
            }
        });
    }

    // list patients
    patients() {
        this.patient_model.listPatient((data) => {
            View.DisplayData(data)
        })
    }
}

module.exports = Controller