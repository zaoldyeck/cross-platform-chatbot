const {MessengerBot} = require('bottender');
const {createServer} = require('bottender/koa');

const config = require('./bottender.config.js').messenger;

const bot = new MessengerBot({
    accessToken: config.accessToken,
    appSecret: config.appSecret,
});

bot.onEvent(async context => {
    await context.sendText('Hello World');
});

const server = createServer(bot);

server.listen(5000, () => {
    console.log('server is running on 5000 port...');
});
