const Message = require('./Message')
const {Line} = require('messaging-api-line')

module.exports = class KKBOXMessage extends Message {
    constructor(data) {
        super(data)
    }

    toLineMessage() {
        const columns = this.data.map(el => {
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

    toMessengerMessage() {
        return {
            attachment: {
                type: 'template',
                payload: {
                    "template_type": "list",
                    "top_element_style": "compact",
                    "elements": [
                        {
                            "title": "Classic T-Shirt Collection",
                            "subtitle": "See all our colors",
                            "image_url": "https://i.kfs.io/playlist/global/34601v1/fit/500x500.jpg",
                            "buttons": [
                                {
                                    "title": "View",
                                    "type": "web_url",
                                    "url": "https://widget.kkbox.com/v1/?id=OtY2I4ebPHGasNyABp&amp;type=playlist&amp;terr=tw&amp;lang=tc",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "https://widget.kkbox.com/v1/?id=OtY2I4ebPHGasNyABp&amp;type=playlist&amp;terr=tw&amp;lang=tc"
                                }
                            ]
                        },
                        {
                            "title": "Classic White T-Shirt",
                            "subtitle": "See all our colors",
                            "default_action": {
                                "type": "web_url",
                                "url": "https://widget.kkbox.com/v1/?id=OtY2I4ebPHGasNyABp&amp;type=playlist&amp;terr=tw&amp;lang=tc",
                                "messenger_extensions": false,
                                "webview_height_ratio": "tall"
                            }
                        }
                    ],
                    "buttons": [
                        {
                            "title": "View More",
                            "type": "postback",
                            "payload": "payload"
                        }
                    ]
                }
            }
        }
    }
}