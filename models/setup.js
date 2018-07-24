const createTableEmployeesSql =
    `CREATE TABLE IF NOT EXISTS employees(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        username TEXT,
        password TEXT,
        roleId INTEGER,
        FOREIGN KEY(roleId) REFERENCES roles(id)
    )`;

const createTableRolesSql = 
    `CREATE TABLE IF NOT EXISTS roles(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`;

const createTablePatientsSql = 
    `CREATE TABLE IF NOT EXISTS patients(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        doctorId INTEGER,
        FOREIGN KEY(doctorId) REFERENCES employees(id)
    )`;

const createTableDiagnosesSql = 
    `CREATE TABLE IF NOT EXISTS diagnoses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`;

const createTablePatientsDiagnosesSql = 
    `CREATE TABLE IF NOT EXISTS patients_diagnoses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientId INTEGER,
        diagnosisId INTEGER,
        FOREIGN KEY(patientId) REFERENCES patients(id),
        FOREIGN KEY(diagnosisId) REFERENCES diagnoses(id)
    )`;

const createTableLoginsSql = 
    `CREATE TABLE IF NOT EXISTS logins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId INTEGER,
        loginTime INTEGER,
        logoutTime INTEGER
    )`;

const dropTableSql = table_name => {
    return  `DROP TABLE IF EXISTS ${table_name}`;
}

const setup = db => {
    db.serialize(() => {
        db.run(dropTableSql('roles'));
        db.run(dropTableSql('employees'));
        db.run(dropTableSql('patients'));
        db.run(dropTableSql('diagnoses'));
        db.run(dropTableSql('patients_diagnoses'));
        db.run(dropTableSql('logins'));
        db.run(createTableRolesSql);
        db.run(createTableEmployeesSql);
        db.run(createTablePatientsSql);
        db.run(createTableDiagnosesSql);
        db.run(createTablePatientsDiagnosesSql);
        db.run(createTableLoginsSql);
    });
}

module.exports = setup;