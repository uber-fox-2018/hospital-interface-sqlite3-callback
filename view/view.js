class View {

  static showHelp() {
    console.log(`
      1. node index.js register [name] [username] [password] [position]
      2. node index.js login [username] [password]
      3. node index.js addPatient [name] [gender] [age] [diagnosis]
      4. node index.js logout
    `)
  }

  static message(msg) {
    console.log(msg)
  }

  static messageErr(err) {
    console.log(err)
  }
}

module.exports = View