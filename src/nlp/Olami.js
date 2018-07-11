const config = require('../../config')
const axios = require('axios')
const md5 = require('md5')
const TextMessage = require('../message/TextMessage');

class Olami {
    constructor(appKey = config.olami.appKey, appSecret = config.olami.appSectet, inputType = 1) {
        this.URL = 'https://tw.olami.ai/cloudservice/api'
        this.appKey = appKey
        this.appSecret = appSecret
        this.inputType = inputType
    }

    nli(text, cusid = null) {
        const timestamp = Date.now()
        return axios.post(this.URL, {}, {
            params: {
                appkey: this.appKey,
                api: 'nli',
                timestamp: timestamp,
                sign: md5(`${this.appSecret}api=nliappkey=${this.appKey}timestamp=${timestamp}${this.appSecret}`),
                cusid: cusid,
                rq: JSON.stringify({'data_type': 'stt', 'data': {'input_type': this.inputType, 'text': text}})
            }
        }).then(response => {
            const nli = response.data.data.nli[0];
            return this._intentDetection(nli)
        })
    }

    _intentDetection(nli) {
        const type = nli.type
        const desc = nli.desc_obj
        const data = nli.data_obj

        function handleSelectionType(desc) {
            const descType = desc.type

            switch (descType) {
                case 'news':
                    return new TextMessage(desc.result + '\n\n' + data.map((el, index) => index + 1 + '. ' + el.title).join('\n'))
                case 'poem':
                    return new TextMessage(desc.result + '\n\n' + data.map((el, index) => index + 1 + '. ' + el.poem_name).join('\n'))
                case 'cooking':
                    return new TextMessage(desc.result + '\n\n' + data.map((el, index) => index + 1 + '. ' + el.name).join('\n'))
                default:
                    return '對不起，你說的我還不懂，能換個說法嗎？'
            }
        }

        switch (type) {
            case 'kkbox':
                return (data.length > 0) ? new TextMessage(data[0].url) : new TextMessage(desc.result)
            case 'baike':
                return new TextMessage(data[0].description)
            case 'news':
                return new TextMessage(data[0].detail)
            case 'joke':
                return new TextMessage(data[0].content)
            case 'cooking':
                return new TextMessage(data[0].content)
            case 'selection':
                return handleSelectionType(desc)
            case 'ds':
                return new TextMessage(desc.result + '\n請用 /help 指令看看我能怎麼幫助您')
            default:
                return new TextMessage(desc.result)
        }
    }
}

module.exports = new Olami()