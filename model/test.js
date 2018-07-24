const sqlite3 = require(`sqlite3`).verbose();
const db = new sqlite3.Database(`./hospital.db`);

let querryIsAlreadyLogin = `SELECT loginStats FROM employees WHERE loginStats = 1`
        db.get(querryIsAlreadyLogin,(err,data) => {
            console.log(data);
            
            
        })

        
