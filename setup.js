const sql3 = require('sqlite3').verbose()
var db = new sql3.Database('./hospitaldb')

function crate_and_seed() {
    var queryEmployee = `CREATE TABLE IF NOT EXISTS employees
                (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 username VARCHAR(20),
                 password VARCHAR(10),
                 position VARCHAR(10),
                 loginStatus VARCHAR(2) DEFAULT 0);`
    
    var queryPatient = `CREATE TABLE IF NOT EXISTS patients
                        (id INTEGER PRIMARY KEY AUTOINCREMENT,
                         name VARCHAR(15),
                         diagnosis VARCHAR(20))`
    
    db.serialize(()=> {
        
        db.run(queryEmployee,(err)=>{
            if(err){
                throw console.error(err.message)
            }else{
                console.log('berhasil');
                
            }
        })

        db.run(queryPatient,(err)=>{
            if(err){
                throw console.error(err.message)
            }else{
                console.log('berhasil');
                
            }
        })
    })
}

crate_and_seed()