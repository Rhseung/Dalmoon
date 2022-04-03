const bot = BotManager.getCurrentBot();
const { Container, Message } = require('./module');

var container = new Container();
var message = new Message().setPrefix('/');

bot.on(Event.MESSAGE, (msg) => {
    message.set(msg);
    container.execute(message);
});

function help () {

}
container.register(help).aliase('?').option({ many: true });

function triangle (a, b, c) {
    let s = (a + b + c) / 2;

    message.replyf("triangle's surface: {}", Math.sqrt(s * (s-a) * (s-b) * (s-c)));
};
container.register(triangle, Number, Number, Number);

function add () {
    message.replyf("sum: {}", Array.from(arguments).reduce((acc, cur) => acc + cur));
}
container.register(add, Number, Number, Number).option({ many: true });

function ping () {
    message.reply("pong");
}
container.register(ping);