const bot = BotManager.getCurrentBot();
var api = require('command_handler.js');

bot.on(Event.COMMAND, msg => {
    msg.allowLevel = msg.author.name.startsWith("[staff]") ? 1 : 0;

    var commands = new api.botCommandLib(msg);
});

// concept_2:
// commands.form({
//     add: new botManager.botCommandBuilder()
//         .type(String)
//         .description("add numbers")
//         .room("room_name")
//         .configs({ staffonly: true, canDM: true, canGroupChat: true })
//         .next({
//             n: new botManager.botCommandBuilder()
//             .type(Number)
//             .next({
//                 n2: new botManager.botCommandBuilder()
//                     .type(Number)
//                     .execute(
//                         (msg, params) => msg.reply(params.n + params.n2)
//                     ),

//                 random: new botManager.botCommandBuilder()
//                     .type(String)
//                     .execute([
//                         0, 1, 2, 3, 4, 5, 6, 7, 8, 9
//                     ]),
//             })
//             .missing(
//                 (msg, params) => msg.reply(params.n)
//             ),
//         })
//         .missing(
//             "at least one number argument"
//         )
// });

// commands.form({
//     add: new Command(String, true, true, {
//         n: new Command(Number, true, false, ['room_name1'], {
//             n2: new Command().execute(msg => msg.reply("hi~"))
//         })
//     })
// })

// concept_3:
// commands.parse('/(add|+|plus|덧셈) [Number] [Number]', (msg, args) => {
//     msg.reply(args[0] || 0 + args[1] || 0);
// })