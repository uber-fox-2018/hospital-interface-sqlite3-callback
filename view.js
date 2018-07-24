const chalk = require("chalk");

class View{
    static addEmployee(employeeObj, length){
        if(employeeObj==="error" && length===0){
            console.log("Failed");
        }else{
            console.log("Save data success",  employeeObj ,`. Total employee : ${length}`);
        }
    }

    static login(result){
        if(result===false){
            console.log("username / password Salah")
        }else if(result === "full"){
            console.log("a user is still logged in")
        }else if(result === "still"){
            console.log("you are still logged in")
        }else{
            console.log(`user ${result.username} logged in successfully`);
        }
    }
    
    static addPatient(result){
        if(!result){
            console.log("tidak memiliki akses untuk add patient")
        }else{
            console.log("data pasien berhasil ditambahkan. Total data pasien: " , result)
        }
    }
    
    static logout(username, result){
        if(result === 0){
            console.log(`${username} is not logged in`)
        }else{
            console.log(`Goodbye, ${username}! See you again soon!`)
        }
    }

    static help(){
        console.log(chalk.cyan("======================================================================"));
        console.log(chalk.whiteBright("Welcome to 🏥  Hospital Cepat Sembuh! Choose the menu: 🖍 \n"));
        console.log(chalk.keyword('orange')("1) help"));
        console.log(chalk.green("2) register <username> <password> <role>"));
        console.log(chalk.yellow("3) login <username> <password>"));
        console.log(chalk.magenta("4) logout <username> <password>"));
        console.log(chalk.whiteBright("And...If a 'dokter' is logged in, he/she also can: "));
        console.log(chalk.blue("5) addPatient <name> <illness_1> <illness_2> ... <illness_N>"));
        console.log(chalk.cyan("======================================================================"));
    } 
}

module.exports = View;