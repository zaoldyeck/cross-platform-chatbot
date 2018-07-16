module.exports = class Message {
    constructor(data) {
        this.data = data
    }

    toLineMessage() {
        return this.data
    }

    toMessengerMessage() {
        return this.data
    }
}