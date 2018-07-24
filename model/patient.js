const db = require(`./db.js`)
class Patient {
    constructor(name, age, diagnose){
        this.name = name,
        this.age = age,
        this.diagnose = diagnose
    }
    static createPatient(name, age, diagnose,cb) {
        const objPatient = new Patient(name, age, diagnose)
        cb(objPatient)
    }
    static addPatient(obj,cb) {
        let queryIsDoctorActive = `SELECT position FROM employees WHERE position = 'doctor' and loginStats = 1` 
        db.get(queryIsDoctorActive, (err, doctor) => {
            if (typeof doctor !== `undefined`) {
                let queryInsertPatient =  `INSERT INTO patiens (name, age, diagnose)  
                VALUES ('${obj.name}', ${Number(obj.age)}, '${obj.diagnose}');`
                db.run(queryInsertPatient,(err)=>{
                    if(err) throw err
                    cb(`\n> Adding Patient :\n  with name: ${obj.name}, Age: ${Number(obj.age)}, Diagnose: ${obj.diagnose}\n  is complete\n`)
                })
            } else { // doctor ga ada
                cb(`\n> This account doesn't have rights to add patient!\n`)
            }  
        })
    }
}

module.exports = Patient