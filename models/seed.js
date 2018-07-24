const seed = (db) => {
    db.serialize(() => {

        roles.forEach(role => {
            db.run(`INSERT INTO roles (name) VALUES (?)`,
                [role.name]);
        });

        employees.forEach(employee => {
            db.run(`INSERT INTO employees (name, username, password, roleId) VALUES (?, ?, ?, ?)`, 
                [employee.name, employee.username, employee.password, employee.roleId]);
        });

        patients.forEach(patient => {
            db.run(`INSERT INTO patients (name, doctorId) VALUES (?, ?)`,
                [patient.name, patient.doctorId]);
        });

        diagnoses.forEach(diagnosis => {
            db.run(`INSERT INTO diagnoses (name) VALUES (?)`, [diagnosis.name])
        });

        patients_diagnoses.forEach(row => {
            db.run(`INSERT INTO patients_diagnoses (patientId, diagnosisId) VALUES (?, ?)`, [row.patientId, row.diagnosisId]);
        });

    });
}

const roles = [
    { name: "admin" },
    { name: "receptionist" },
    { name: "office boy" },
    { name: "doctor" }
]

const employees = [
    { name: "Amuro Ray", username: "amuro", password: "whitedemon", roleId: 1 },
    { name: "Kamille Bidan", username: "kamillle", password: "zetagundam", roleId: 1 },
    { name: "Relena Darlian", username: "relena", password: "peacecraft", roleId: 2 },
    { name: "Aina Bernstein", username: "aina", password: "kudelia", roleId: 2 },
    { name: "Kira Yamato", username: "kirayamato", password: "strikefreedom", roleId: 3 },
    { name: "Arthrun Zala", username: "arthrunzala", password: "infinitejustice", roleId: 3 },
    { name: "Soran Ibrahim", username: "setsuna", password: "exia00raiser", roleId: 4 },
    { name: "Char Aznable", username: "charaznable", password: "crimsoncomet", roleId: 4 }
]

const patients = [
    { name: "Graham Acker", doctorId: 7 },
    { name: "Ali Al-Saachez", doctorId: 7 },
    { name: "Ribbons Almarck", doctorId: 7 },
    { name: "Garma Zabi", doctorId: 8 },
    { name: "Kycilia Zabi", doctorId: 8 },
    { name: "Dozle Zabi", doctorId: 8 }
]

const diagnoses = [
    { name: "septicemia" },
    { name: "hypertension" },
    { name: "pneumonia" },
    { name: "mood disorder" },
    { name: "cardiac dysrhythmias" },
    { name: "influenza" },
    { name: "dengue fever" },
    { name: "ebola" },
    { name: "leukimia" },
    { name: "vertigo" }
]

const patients_diagnoses = [
    { patientId: 1, diagnosisId: 1 },
    { patientId: 1, diagnosisId: 2 },
    { patientId: 1, diagnosisId: 3 },
    { patientId: 2, diagnosisId: 4 },
    { patientId: 2, diagnosisId: 5 },
    { patientId: 2, diagnosisId: 6 },
    { patientId: 3, diagnosisId: 3 },
    { patientId: 3, diagnosisId: 5 },
    { patientId: 3, diagnosisId: 7 },
    { patientId: 4, diagnosisId: 4 },
    { patientId: 4, diagnosisId: 6 },
    { patientId: 4, diagnosisId: 8 },
    { patientId: 5, diagnosisId: 5 },
    { patientId: 5, diagnosisId: 7 },
    { patientId: 5, diagnosisId: 9 },
    { patientId: 6, diagnosisId: 6 },
    { patientId: 6, diagnosisId: 8 },
    { patientId: 6, diagnosisId: 10 },
]

module.exports = seed;