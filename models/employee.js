class Employee {
    constructor(name, username, password) {
      this.name = name
      this.username = username
      this.password = password
      this.roleId = null;
      this.role = null;
    }
}

module.exports = Employee;