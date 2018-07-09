const express = require('express');
const bodyParser = require('body-parser');
const {
    MessengerBot,
    LineBot
} = require('bottender');
const {registerRoutes} = require('bottender/express');

const handler = require('./handler');
const config = require('../config');

const server = new express();

server.use(
    bodyParser.json({
        verify: (req, res, buf) => {
            req.rawBody = buf.toString();
        },
    })
);

const bots = {
    messenger: new MessengerBot(config.messenger).onEvent(handler),
    line: new LineBot(config.line).onEvent(handler)
};

registerRoutes(server, bots.messenger, {
    path: '/messenger',
    verifyToken: config.messenger.verifyToken,
});
registerRoutes(server, bots.line, {path: '/line'});

server.listen(5000, () => {
    console.log('server is listening on 5000 port...');
});