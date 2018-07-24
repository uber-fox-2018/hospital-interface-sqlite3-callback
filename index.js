const Controller = require("./controller.js")

let argv=process.argv
let command=argv[2]
let myUserName=argv[3]
let myPassword=argv[4]
let myPosition=argv[5]


// let myPatientId=argv[3]
let myPatient=argv[3]
let myDiagnosis=argv.slice(4)

if(command === 'register' && myUserName !== undefined && myPassword!==undefined && myPosition !== undefined) {
	Controller.register(myUserName,myPassword,myPosition)
}else if(command === 'login' && myUserName !== undefined && myPassword!==undefined) {
 	Controller.login(myUserName,myPassword) 
}else if(command === 'addPatient' && myPatient!==undefined &&  myDiagnosis!== undefined) {
	Controller.addPatient(myPatient,myDiagnosis);
}	
	



