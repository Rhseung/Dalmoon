const bot = BotManager.getCurrentBot();
var { Container, Message } = require('./module');

var container = new Container();
var message = new Message().setPrefix('/');

bot.on(Event.MESSAGE, (msg) => {
    message.build(msg);

    container.register(triangle, Number, Number, Number);
    container.register(add).option({ many: true });
    container.register(ping);

    container.execute(message);
});

function triangle (a, b, c) {
    let s = (a + b + c) / 2;

    message.replyf("triangle's surface: {}", Math.sqrt(s * (s-a) * (s-b) * (s-c)));
};

function add () {
    message.replyf("sum: {}", Array.from(arguments).map(Number).reduce((acc, cur) => acc + cur));
}

function ping () {
    message.reply("pong");
}