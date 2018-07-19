module.exports = class Message {
    constructor(data) {
        this.data = data
    }

    /**
     * For Line platform.
     */
    toLineMessage() {
        return this.data
    }

    /**
     * For FB Messenger platform.
     */
    toMessengerMessage() {
        return this.data
    }

    /**
     * For Telegram platform.
     */
    toTelegramMessage() {
        return this.data
    }
}