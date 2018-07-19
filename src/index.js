const express = require('express')
const bodyParser = require('body-parser')
const {MessengerBot, LineBot} = require('bottender')
const {registerRoutes} = require('bottender/express')

const {lineHandler, messengerHandler} = require('./handler')
const config = require('../config')

const server = new express()

server.use(
    bodyParser.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString()
        }
    })
)

const bots = {
    line: new LineBot(config.line).onEvent(lineHandler),
    messenger: new MessengerBot(config.messenger).onEvent(messengerHandler)
}

registerRoutes(server, bots.line, {path: '/line'})
registerRoutes(server, bots.messenger, {
    path: '/messenger',
    verifyToken: config.messenger.verifyToken,
})

server.listen(process.env.PORT || 5000, () => {
    console.log('server is listening on 5000 port...')
})