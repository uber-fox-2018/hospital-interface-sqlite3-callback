const command = process.argv[2];
const input = process.argv.slice(3);
const Controller = require ('./controller');


switch (command){
  case 'help':
  Controller.help();
  break;
  case 'register':
  Controller.register(input);
  break;
  case 'login':
  Controller.login(input[0], input[1]);
  break;
  case 'addPatient':
  Controller.addPatient(input[0], input.slice(1));
  break;
  case 'logout':
  Controller.logout(input[0], input[1]);
  break;
  default:
  Controller.help();
}