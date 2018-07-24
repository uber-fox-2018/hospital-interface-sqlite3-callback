const db = require('./databaseHospital')

function createTable() {
    db.serialize(() => {
        db.run(`ALTER TABLE Employees ADD COLUMN isOnline INTEGER(1)`, (err) => {  
            (err) ? console.log(err) : console.log('Success to updated Database');      
        })
    })
}


createTable()