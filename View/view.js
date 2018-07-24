class View {
    static displayMessage(msg = null, err = null) {
        (!err) ? console.log(msg) : console.log(err);
    }
}

module.exports = View