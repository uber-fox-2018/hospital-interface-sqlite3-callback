class Employee {
  constructor(name, username, password, position) {
    this.name = name
    this.username = username
    this.password = password
    this.position = position
    this.login = false
  }
}

module.exports = Employee