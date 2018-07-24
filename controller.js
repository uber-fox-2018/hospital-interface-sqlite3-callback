const Model = require("./model.js")
const View = require("./view.js")

class Controller {

	static register(myUserName,myPassword,myPosition) {
		Model.register(myUserName,myPassword,myPosition,(registered) => {
			View.register(registered);
		})	
	}

	static login(myUserName,myPassword) {
		Model.login(myUserName,myPassword,(result) => {
			View.login(result);	
		});
	}

	static addPatient(myPatient,myDiagnosis) {
		Model.addPatient(myPatient,myDiagnosis,(result) => {
			View.addPatient(result);
		})
	}	
}

module.exports=Controller