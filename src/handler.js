const olami = require('./nlp/Olami')

module.exports = async context => {
    //console.log(context)
    //console.log(context.event.text)
    //await context.sendText(`Hello World. Platform: ${context.platform}`);
    const text = context.event.text
    const reply = await olami.nli(text)
    console.log(reply)
    //await context.replyText(`Hello World. Platform: ${context.platform}`);
    await context.replyText(reply);
    /*
    await context.replyCarouselTemplate('this is a carousel template', [
        {
            thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [
                {
                    type: 'postback',
                    label: 'Buy',
                    data: 'action=buy&itemid=111',
                },
                {
                    type: 'postback',
                    label: 'Add to cart',
                    data: 'action=add&itemid=111',
                },
                {
                    type: 'uri',
                    label: 'View detail',
                    uri: 'http://example.com/page/111',
                },
            ],
        },
        {
            thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
            title: 'this is menu',
            text: 'description',
            actions: [
                {
                    type: 'postback',
                    label: 'Buy',
                    data: 'action=buy&itemid=222',
                },
                {
                    type: 'postback',
                    label: 'Add to cart',
                    data: 'action=add&itemid=222',
                },
                {
                    type: 'uri',
                    label: 'View detail',
                    uri: 'http://example.com/page/222',
                },
            ],
        },
    ]);
    */
};