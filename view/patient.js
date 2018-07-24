class View{

    static showAddPatientError(result){
        console.log(result)
    }

    static showAddPatientSuccess(result){
        console.log(`data pasien berhasil ditambahkan. Total data pasien : ${result}`)
    }

}

module.exports = View