const bot = BotManager.getCurrentBot();
const { Command, Message } = require('./module');

var Command = new Command();
var Message = new Message().setPrefix('/');

bot.on(Event.MESSAGE, (msg) => {
    Message.set(msg);

    Command.register(triangle, Number, Number, Number);
    Command.register(ping);

    Command.execute(Message);
});

triangle = (a, b, c) => {
    let s = (a + b + c) / 2;

    Message.replyf("triangle's surface: {}", Math.sqrt(s * (s-a) * (s-b) * (s-c)));
};

ping = () => {
    Message.reply("pong");
}