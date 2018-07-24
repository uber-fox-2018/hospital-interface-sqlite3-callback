class Employee {
    constructor(username, password, position){
        this.username = username,
        this.password = password,
        this.position = position,
        this.loginStatus = false
    }
}

module.exports = Employee