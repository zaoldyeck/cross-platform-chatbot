module.exports = class Message {
    constructor(body) {
        this.body = body
    }

    asLineMessage() {
        return this.body
    }

    asMessengerMessage() {
        return this.body
    }
}