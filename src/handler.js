const {LineHandler, MessengerHandler} = require('bottender')
const olami = require('./nlp/Olami')

exports.lineHandler = new LineHandler()
    .onFollow(async context => {
        await context.replyText('歡迎你')
    })
    .onText('\/help', async context => {
        await context.replyText('Hello~ 本 Bot 是用 http://bit.ly/2uz7wY4 開源程式碼所完成\n\n' +
            '您可以問我\n' +
            '天氣，例如：「台北天氣如何」\n' +
            '百科，例如：「川普是誰」\n' +
            '新聞，例如：「今日新聞」\n' +
            '音樂，例如：「我想聽周杰倫的等你下課」\n' +
            '日曆，例如：「現在時間」\n' +
            '詩詞，例如：「我想聽水調歌頭這首詩」\n' +
            '笑話，例如：「講個笑話」\n' +
            '故事，例如：「說個故事」\n' +
            '股票，例如：「台積電的股價」\n' +
            '食譜，例如：「蛋炒飯怎麼做」\n' +
            '聊天，例如：「你好嗎」')
    })
    .onText(async context => {
            const text = context.event.text
            const reply = await olami.nli(text)
            await context.reply([reply.asLineMessage()])
        }
    )

exports.messengerHandler = new MessengerHandler()
    .onText(async context => {
        const text = context.event.text
        const reply = await olami.nli(text)
        await context.reply([reply.asMessengerMessage()])
    })