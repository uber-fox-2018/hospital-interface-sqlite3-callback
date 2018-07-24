let Controll = require('./controller.js')

class View {
   static registration (employeeData){
    
    console.log('save data success')
    console.log(employeeData[employeeData.length-1])
    console.log(`Total employee ${employeeData.length}`) 
   }
   static login(result){
       console.log(result)
   }
   static addPatient(result){
       console.log(result)
   }
   static logout(result){
       console.log(result)
   }
}

module.exports = View