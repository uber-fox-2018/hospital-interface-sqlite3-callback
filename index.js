const command = process.argv[2]
const dataInput = process.argv.slice(3)
const View = require('./view.js')
const Controller = require('./controller.js')
const Model = require('./model.js')
var Patient = new Model.Patient
var Employee = new Model.Employee

if(command === 'help' ||!command){
	Controller.help()
}else if(command === 'register'){
	Controller.checkAdmin(dataInput)
}else if(command === 'login'){
	Controller.login(dataInput)
}else if(command === 'addPatient'){
	Controller.addPatient(dataInput)
}else if(command === 'logout'){
	Controller.logout()
}