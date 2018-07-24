const db = require('./setup')

class Patient {
    static addDataPatient(first_name, last_name, gender, diagnosis, cbAddPatient){
        let fulldate = new Date()
        let date     = fulldate.toLocaleDateString()
        let query    = `INSERT INTO patients (first_name, last_name, gender, diagnosis, date) 
                        VALUES ("${first_name}", "${last_name}", "${gender}", "${diagnosis}", "${date}")`
        let message
        db.serialize(() => {
            db.run(query, function(err) {
                if(!err) {
                    message = `Insert Data Patient ${first_name} Success`
                } else {
                    message = `Insert Data Patient Failed`
                }
                cbAddPatient(message)
            })
        })
    }

    static totalPatient(cbTotalPatient){
        let query = "SELECT COUNT(*) FROM patients"

        db.run(query, function(err, data) {
            cbTotalPatient(data)
        })

    }
}

module.exports = Patient