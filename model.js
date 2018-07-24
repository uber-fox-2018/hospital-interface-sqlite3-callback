var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');


class Patient {
  static createTable() {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS patient 
      (id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR, 
      diagnosis TEXT);`);
    })
  }

  static createPatient(name, diagnosis,cb) {
    let query = `INSERT INTO patient (name,diagnosis)
               VALUES('${name}','${diagnosis.join(',')}');`

    db.run(query, () => {
      let totalPatientQuery = `SELECT * FROM patient`
            db.all(totalPatientQuery, (err, dataPatient) => {
              
              cb(dataPatient)
            })
     })
  }

  static update(id, name, diagnosis) {
    let query = `UPDATE patient
                SET name    = '${name}',
                diagnosis   = '${diagnosis}'
                WHERE id = '${id}';`
    db.run(query, () => { })
  }

  static delete(id) {
    let query = `DELETE FROM patient
                WHERE id = '${id}';`
    db.run(query, () => { })
  }

  static initData() {
    let dataPatient = [{ name: 'Udin', diagnosis: 'jantung'},
    { name: 'budi', diagnosis: 'kulit'},
    { name: 'soleh', diagnosis: 'jantung'},
    { name: 'ujang', diagnosis: 'kanker'},
    { name: 'cucun', diagnosis: 'flue'},
    { name: 'mino', diagnosis: 'demam'},
    { name: 'alex', diagnosis: 'paruparu'},
    { name: 'kley', diagnosis: 'jantung'}]

    dataPatient.forEach(data => {
      db.run(`INSERT INTO patient (name,diagnosis)
      VALUES ('${data.name}','${data.diagnosis}');`, () => { })
    });

  }
}

module.exports = Patient
