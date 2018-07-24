const View = require('./view');
const Model = require('./model');

class Hospital {

  static help (){
    let messages = [
      `node index.js help`,
      `node index.js register <username> <password> <position>`,
      `node index.js login <username> <password>`,
      `node index.js addPatient <name> <diagnosis(es)>`,
      `node index.js logout`
    ]
    messages.forEach((message)=> {
      View.display(message);
    })
  }

  static register (inputArr){
    Model.addEmployee(inputArr, (message)=> {
      View.display(message);
    })
  }

  static login (name, pwd){
    Model.isAnotherLoggedIn((isThere)=>{
      if (isThere){
        View.display(`another user is still logged in. log him/her out first!`);
      } else {
        Model.loggingIn(name, pwd, (message)=> {
          View.display(message);
        })
      }
    })
  }

  static logout (){
    Model.logout((message)=> {
      View.display(message)
    })
  }

  static addPatient(name, diagnosis){
    Model.isDoctorLoggedIn((isDoctor) => {
      if (!isDoctor){
        View.display(`you dont have access to add patient`);
      } else {
        Model.addPatient(name, diagnosis, (message)=> {
          View.display(message);
        })
      }
    })
  }
}

module.exports = Hospital;
