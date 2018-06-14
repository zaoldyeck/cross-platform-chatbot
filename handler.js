const handler = async context => {
    console.log(context.event.text)
    //await context.sendText(`Hello World. Platform: ${context.platform}`);
    await context.replyText(`Hello World. Platform: ${context.platform}`);
};

module.exports = handler;