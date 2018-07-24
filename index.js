const argv = process.argv.slice(2);
let command = argv[0];
const Controller = require("./controller");
let controller = new Controller();
let username;
let password;
let position;
let name;

// console.log(argv[3]);

switch (command) {
  case undefined || "help":
    controller.c_help();
    break;

  case "register":
    username = argv[1];
    password = argv[2];
    position = argv[3];
    controller.c_register(username, password, position);
    break;

  case "login":
    username = argv[1];
    password = argv[2];
    controller.c_login(username, password);
    break;

  case "addPatient":
    name = argv[1];
    data = argv.slice(2);
    diagnosis = data.join(",");
    controller.c_addPatient(name, diagnosis);
    break;

  case "logout":
    username = argv[1];
    controller.c_logout(username);
    break;
}
