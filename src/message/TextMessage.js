const Message = require('./Message')
const {Line} = require('messaging-api-line')

module.exports = class TextMessage extends Message {
    constructor(body) {
        super(body);
    }

    asLineMessage() {
        return Line.createText(this.body)
    }
}