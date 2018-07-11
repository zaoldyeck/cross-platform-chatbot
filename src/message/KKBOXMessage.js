const Message = require('./Message')
const {Line} = require('messaging-api-line')

module.exports = class KKBOXMessage extends Message {
    constructor(body) {
        super(body);
    }

    asLineMessage() {

        return Line.createCarouselTemplate(this.body)
    }
}