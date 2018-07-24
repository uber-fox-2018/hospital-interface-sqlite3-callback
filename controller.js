const Model = require("./model");
const View = require("./view");

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  c_register(username, password, position) {
    this.model.m_register(username, password, position, (err, msg) => {
      if (err) {
        this.view.v_display(err);
      } else {
        this.view.v_display(msg);
      }
    });
  }

  c_login(username, password) {
    this.model.m_login(username, password, (err, msg) => {
      if (err) {
        this.view.v_display(err);
      } else {
        this.view.v_display(msg);
      }
    });
  }
  c_addPatient(name, diagnosis) {
    this.model.m_addPatient(name, diagnosis, (err, msg) => {
      if (err) {
        this.view.v_display(err);
      } else {
        this.view.v_display(msg);
      }
    });
  }
  c_logout(username) {
    this.model.m_logout(username, (err, msg) => {
      if (err) {
        this.view.v_display(err);
      } else {
        this.view.v_display(msg);
      }
    });
  }
}
module.exports = Controller;
