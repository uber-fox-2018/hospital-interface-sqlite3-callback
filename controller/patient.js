const Model = require('../model/patient')
const View = require('../view/patient')

class Controller{
    static addPatient(name,diagnosis){
        Model.addPatient(name,diagnosis,function(err,totalPatient){
            if(err){
                View.showAddPatientError(err)
            }else{
                View.showAddPatientSuccess(totalPatient)
            }
        })
    }
}

module.exports = Controller