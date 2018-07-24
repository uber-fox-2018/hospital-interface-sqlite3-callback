const db = require('./config.js');

db.serialize(()=> {
    db.serialize( () => {
        let employees = `CREATE TABLE IF NOT EXISTS employees (
            id	        INTEGER     PRIMARY KEY AUTOINCREMENT,
            username	VARCHAR,
            password	VARCHAR,
            role        VARCHAR     DEFAULT     'office_boy',
            login	    BOOLEAN     DEFAULT     'false',
            created_at	TIMESTAMP   DEFAULT     CURRENT_TIMESTAMP
        );`;
        db.run(employees);
    });
    
    db.serialize( () => {
        let patients = `CREATE TABLE IF NOT EXISTS patients (
            id	        INTEGER     PRIMARY KEY AUTOINCREMENT,
            name	    VARCHAR,
            diagnosis   TEXT,
            create_at	TIMESTAMP   DEFAULT     CURRENT_TIMESTAMP
        );`;
        db.run(patients);
    });
});

db.close();