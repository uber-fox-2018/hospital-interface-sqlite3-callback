const db = require(`./db.js`)
class Connection {
    static forInsertData(username, password, position, cb) {
        let queryIntsert = `INSERT INTO employees (username, password, position, loginStats)  
        VALUES ('${username}', '${password}', '${position}',0);`
        let queryLastId = `SELECT COUNT(*) as totalemployee FROM employees`

        db.run(queryIntsert,err => {
            if (err) console.log(`error`);
        })
        db.get(queryLastId,(err,data) => {
            cb(data)
        })
        
    }
    static login(username, password, cb) {
        let querryIsAlreadyLogin = `SELECT loginStats FROM employees WHERE loginStats = 1`
        db.get(querryIsAlreadyLogin,(err,isAlreadyLogin) => {
            if (typeof isAlreadyLogin == `undefined`) { // undefined = belum ada yg login
                let querryIsUsernameExist = `SELECT * FROM employees WHERE username = '${username}'`
                db.get(querryIsUsernameExist, (err,dataForComparasion)=> { // data untuk comparasi buat yg mau login
                    if (typeof dataForComparasion === `undefined`) {
                        cb(`\n> Wrong username or password!\n`)
                    } else {
                        if (dataForComparasion.username === username && dataForComparasion.password === password) { // data cocok apa engga?
                            let queryForUpdateLoginStats = `UPDATE employees SET loginStats = 1 WHERE username = '${username}';`
                            db.run(queryForUpdateLoginStats,err => {
                                if (err) cb(`\n> Login failed!\n`)
                                else cb(`\n> Login success!\n`)
                            })
                        } else {
                            cb(`\n> Wrong username or password!\n`)
                        }
                    }
                })
            } else {//udah ada yg login
                cb(`\n> You Already Login!\n`)
            }
        })
    }
    static logout(cb) {
        let querySearchWhoIsLogin = `SELECT id FROM employees WHERE loginStats = 1`
        db.get(querySearchWhoIsLogin,(err,whoIsLogin) => {
            if (typeof whoIsLogin == `undefined` ) {
                cb(`\n> Already Logout!\n`)
            } else {
                let queryChangeWhoisLogin =  `UPDATE employees SET loginStats = 0 WHERE id = '${whoIsLogin.id}';`
                db.run(queryChangeWhoisLogin,(err) => {
                    if (err) cb(`\n> Logout Failed!\n`)
                    else cb(`\n> Logout complete!\n`)
                })
            }
        })
    }
}

module.exports = Connection