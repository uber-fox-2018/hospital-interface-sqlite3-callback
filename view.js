class View{
    static help(command){
        console.log(`node index.js ${command}`)
    }
    static displayRegister(param){
        console.log(`employee ${param.name} ditambahkan sebagai ${param.position}`)
    }
    static canNotAccess(employee){
        console.log(`Can Not Access, this features for ${employee}`)
    }
    static displayAlreadyLogin(data){
        console.log(`employee ${data[0].name} already login`)
    }
    static idPasswordSalah(){
        console.log(`id atau password salah`);   
    }
    static login(data){
        console.log(`selamat datang ${data.role} ${data.name}`)
    }
    static displayAddPatient(param){
        console.log(`data pasien berhasil di tambahkan. Total data pasien : ${param}`);
    }
    static logout(param){
        console.log(param);
        
    }

}

module.exports = View