const bot = BotManager.getCurrentBot();
const botManager = require('command_handler.js');

botManager.absorb(bot);     // 작명 맘에 드네
const commands = new botManager.command_register_container();

concept_1:
commands.register(new botManager.botCommand()
    .setName('add')
    .setDescription("add numbers")
    .setRoom(["room_name"])
    .setStaffOnly(true)
    .setCanDM(true)
    .setCanGroupChat(true)

    .addArgument(Number, arg => new botManager.commandOption()
        .addArgument(Number, arg2 => new botManager.commandOption()
            .execute(msg => msg.reply(arg + arg2))
        )
        .missing(arg)
    )
);

concept_2:
commands.form({
    add: new botManager.botCommandBuilder()
        .type(String)
        .description("add numbers")
        .room("room_name")
        .configs({ staffonly: true, canDM: true, canGroupChat: true })
        .next({
            n: new botManager.botCommandBuilder()
            .type(Number)
            .next({
                n2: new botManager.botCommandBuilder()
                    .type(Number)
                    .execute(
                        (msg, params) => msg.reply(params.n + params.n2)
                    ),

                random: new botManager.botCommandBuilder()
                    .type(String)
                    .execute([
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
                    ]),
            })
            .missing(
                (msg, params) => msg.reply(params.n)
            ),
        })
        .missing(
            "at least one number argument"
        )
});