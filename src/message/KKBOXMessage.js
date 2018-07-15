const Message = require('./Message')
const {Line} = require('messaging-api-line')

module.exports = class KKBOXMessage extends Message {
    constructor(data) {
        super(data)
    }

    asLineMessage() {
        const columns = this.data.map(el => {
            console.log(el.images)
            return {
                thumbnailImageUrl: el.images === undefined ? el.album.images[1].url : el.images[1].url,
                title: el.name === undefined ? el.title : el.name,
                text: el.description === undefined || el.description === '' ? ' ' : el.description.slice(0, 60),
                actions: [{
                    type: 'uri',
                    label: 'Open in KKBOX',
                    uri: el.url
                }]
            }
        }).slice(0, 10)
        return Line.createCarouselTemplate('為您播放', columns, {imageAspectRatio: 'square', imageSize: 'cover'})
    }
}