const config = require('../../config')
const axios = require('axios')
const md5 = require('md5')
const TextMessage = require('../message/TextMessage');
const KKBOXMessage = require('../message/KKBOXMessage')
const KKBOX = require('../api/KKBOX')

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
        const semantic = nli.semantic

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
                    return new TextMessage('對不起，你說的我還不懂，能換個說法嗎？')
            }
        }

        async function handleMusicKKBOXType(semantic) {
            function getKeyWord(semantic, dataType) {
                function getSlotValueByName(slotName) {
                    return semantic.slots.filter(slot => slot.name === slotName)[0].value
                }

                switch (dataType) {
                    case 'artist':
                        return getSlotValueByName('artist_name')
                    case 'album':
                        return getSlotValueByName('album_name')
                    case 'track':
                        return getSlotValueByName('track_name')
                    case 'playlist':
                        return getSlotValueByName('keyword')
                }
            }

            const dataType = semantic.modifier[0].split('_')[2]
            const keyWord = getKeyWord(semantic, dataType)

            const api = await KKBOX.init()
            const data = await api
                .searchFetcher
                .setSearchCriteria(keyWord, dataType)
                .fetchSearchResult()
                .then(response => {
                    return response.data[dataType + 's'].data
                })
            return new KKBOXMessage(data, dataType)
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
            case 'music_kkbox':
                return handleMusicKKBOXType(semantic[0])
            default:
                return new TextMessage(desc.result)
        }
    }
}

module.exports = new Olami()