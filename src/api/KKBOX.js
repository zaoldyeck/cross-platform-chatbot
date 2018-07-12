const config = require('../../config')
const {Auth, Api} = require('@kkbox/kkbox-js-sdk')

module.exports = class KKBOX {
    static init(clientId = config.kkbox.id, clientSecret = config.kkbox.secret) {
        return (async () => {
            const auth = new Auth(clientId, clientSecret)
            const accessToken = await auth.clientCredentialsFlow.fetchAccessToken().then(response => {
                return response.data.access_token
            })
            return new Api(accessToken)
        })()
    }
}