class View {
    static showRegister(username, password, position, totalEmployee) {
        console.log(`save data success {"username":"${username}", "password":"${password}", "role":"${position}"}. Total employee : ${totalEmployee}`)
    }

    static showLoginError(result) {
        console.log(result);
        // if(result === 'y'){
        //     console.log(`sudah ada yg login `)
        // }else if(result === 'n'){
        //     console.log(`username/password is wrong`)
        // }else{
        // } 
    }

    static showLoginSuccess(result) {
        console.log(`user ${result} logged in succesfully`)
    }

    static showLogoutError(result) {
        console.log(result)
    }

    static showLogoutSuccess(username){
        console.log(`username ${username} has been logout`)
    }
}

module.exports = View