const {LineHandler, MessengerHandler} = require('bottender')
const olami = require('./nlp/Olami')

const helpMessage = 'Hi~ 本 Bot 是用 http://bit.ly/2uz7wY4 開源程式碼打造\n\n' +
    '您可以問我\n' +
    '天氣：「台北天氣如何」\n' +
    '百科：「川普是誰」\n' +
    '新聞：「今日新聞」\n' +
    '音樂：「播放告白氣球」；「播放自傳專輯的歌」；「播放動漫歌曲類型的歌」\n' +
    '日曆：「現在時間」\n' +
    '詩詞：「我想聽水調歌頭這首詩」\n' +
    '笑話：「講個笑話」\n' +
    '故事：「說個故事」\n' +
    '股票：「台積電的股價」\n' +
    '食譜：「蛋炒飯怎麼做」\n' +
    '聊天：「你好嗎」'

exports.lineHandler = new LineHandler()
    .onFollow(async context => {
        await context.replyText(helpMessage)
    })
    .onText('\/help', async context => {
        await context.replyText(helpMessage)
    })
    .onText(async context => {
            console.log('有進來嗎')
            const text = context.event.text
            const reply = await olami.nli(text)
            console.log(reply)
            await context.reply([reply.toLineMessage()])
        }
    )
    .onError(async (context, err) => {
        await context.replyText('對不起唷~ 我需要多一點時間來處理 Q_Q')
    })

exports.messengerHandler = new MessengerHandler()
    .onText('\/help', async context => {
        await context.sendText(helpMessage)
    })
    .onText(async context => {
        const text = context.event.text
        const reply = await olami.nli(text)
        await context.sendMessage(reply.toMessengerMessage())
    })
    .onError(async (context, err) => {
        await context.sendText('對不起唷~ 我需要多一點時間來處理 Q_Q')
    })