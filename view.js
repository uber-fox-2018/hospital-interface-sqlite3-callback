class View {
    static DisplayMsg(msg) {
        console.clear()
        console.log(msg)
    }

    static DisplayData(data) {
        console.clear()
        for(let i in data) {
            console.log(data[i])
        }
    }
}

module.exports = View