class View {

    static displayHelp(){
        console.log("=====================HELP MENU======================= \n")
        console.log("login employee : ")
        console.log("   node index.js login username password")
        console.log("logout Employee : ")
        console.log("   node index.js logout")
        console.log("register employee : ")
        console.log("   node index.js register username password name role")
        console.log("list Employee : ")
        console.log("   node index.js list-employees")
        console.log("Add Patient (*doctor): ")
        console.log("   node index.js add-patient first_name last_name gender diagnosis")
        console.log("\n=====================================================")
    }

    static displayInsertEmployee(data){
        console.log(data)
    }

    static displayDataEmployees(username, name, role, date){
        console.log(`username        : ${username}`)
        console.log(`name            : ${name}`)
        console.log(`role            : ${role}`)
        console.log(`register date   : ${date}`)
        console.log('\n')
    }

    static displayStatusLogin(data){
        console.log(data)
    }

    static alreadyLogin(data){
        console.log(`user ${data.name} already login`)
    }

    static displayLogout(data){
        console.log(data)
    }

    static displayAddPatient(data){
        console.log(data)
    }

}

module.exports = View