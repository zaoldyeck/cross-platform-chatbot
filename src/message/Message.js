module.exports = class Message {
    constructor(data) {
        this.data = data
    }

    asLineMessage() {
        return this.data
    }

    asMessengerMessage() {
        return this.data
    }
}