const Message = require('./Message')
const {Line} = require('messaging-api-line')

module.exports = class TextMessage extends Message {
    constructor(data) {
        super(data)
    }

    asLineMessage() {
        return Line.createText(this.data)
    }
}