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
    Model.addEmployee(inputArr, (err, result)=> {
      if (err){
        View.display(err.message);
      } else {
        View.display(result.message);
      }
    })
  }

  static login (name, pwd){
    Model.isAnotherLoggedIn((err, isThere)=>{
      if (err){
        View.display(err.message);
      } else {
        if (isThere){
          View.display(`another user is still logged in. log him/her out first!`);
        } else {
          Model.loggingIn(name, pwd, (err, result)=> {
            if (err){
              View.display(err.message);
            } else {
              View.display(result.message);
            }
          })
        }
      }
    })
  }

  static logout (){
    Model.logout((err, result)=> {
      if(err){
        View.display(err.message);
      } else {
        View.display(result.message);
      }
    })
  }

  static addPatient(name, diagnosis){
    Model.isDoctorLoggedIn((err, isDoctor) => {
      if (err){
        View.display(err.message);
      } else {
        if (!isDoctor){
          View.display(`you dont have access to add patient`);
        } else {
          Model.addPatient(name, diagnosis, (err, result)=> {
            if (err){
              View.display(err.message);
            } else {
              View.display(result.message);
            }
          })
        }
      }
    })
  }
}

module.exports = Hospital;
