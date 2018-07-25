const db = require('./db.js')


class Employee {
  constructor(username, password, role) {
    this.username = username
    this.password = password
    this.role = role
    this.loginStatus = 0
  }

  static m_register(username,password,role,cb){
    let queryRegister = `INSERT INTO Employee (username,password,
                         role,loginStatus) VALUES ("${username}","${password}","${role}","${0}")`
    // let queryTotalEmployee = `SELECT COUNT(*) AS totalEmployee FROM Employee`
    db.run(queryRegister,function(err) {
      if (err){
        cb(err,null)
      }else{
        let employee = new Employee(username,password,role)
        cb(null,employee)
      }
    })
  }

  static m_login(username,password,cb){
    let queryLogin = `SELECT * FROM Employee WHERE username = "${username}" AND password = "${password}"`
    let checkLogin = `SELECT * FROM Employee WHERE loginStatus = 1`
    let updateLogin = `UPDATE Employee SET loginStatus = 1 WHERE username = "${username}"`
    
    db.get(checkLogin, function(err,data){
      if(err){}throw err; //karena membaca err duluan
      if(data !== undefined){ //j karena data masin undefined, jika undefined, maka data --> 'has been loggin' dan tidak bs loggin dengan username sama
        cb(null, `wait, until loggout`)
      } else {
        db.get(queryLogin, function(err,data){
          if (err) throw err
          // console.log(data.username , username, data.password, password);
          if(data.username !== username && data.password !== password){
            cb(null,`wrong username or password, please check again`) 
          } else {
            db.run(updateLogin, function(err){
              if (err) throw err
              console.log(`${username} loggin success`) //jika nama danpassword sama diaakan succes
            })
          }
        })
      }
      
    })
 
  }

  static m_logout(username,cb){
    let queryLogout = `UPDATE Employee SET loginStatus = 0 AND username = "${username}"`

    db.run(queryLogout, function(err){
      if(err) throw err
    })
      console.log(`"${username} has been logout"`);
      // cb(null,null)
  }





}


module.exports = Employee