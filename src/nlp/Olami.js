const config = require('../../config')
const axios = require('axios')
const md5 = require('md5')

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
            return response.data.data.nli[0].desc_obj.result
        })
    }

    _gen_parameters() {

    }

    _gen_sign() {

    }

    _gen_rq() {

    }
}

module.exports = new Olami()