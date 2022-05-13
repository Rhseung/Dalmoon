const bot = BotManager.getCurrentBot();
var api = require('command_handler.js');

bot.on(Event.COMMAND, msg => {
    msg.allowLevel = msg.author.name.startsWith("[staff]") ? 1 : 0;

    var commands = new api.botCommandLib(msg);
    commands.execute(msg);
});
bot.setCommandPrefix("/");

commands.register(pluscmd => new api.botCommand('plus', 'add', '+')
    .setDescription('add numbers')
    .setConfigs({ activateRooms: ['dev room'] })

    .addArguments(e => /^-?\d+$/.test(e), numbers => new api.botCommand()
        .run(msg => numbers.map(Number).reduce((acc, curr) => acc + curr))
    )
);