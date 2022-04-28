const bot = BotManager.getCurrentBot();

const Date = require('new_date.js');
const School = require('./module/school');
const { Container, Message } = require('command_handler.js'); 

var container = new Container();
var message = new Message().setPrefix('[나를 멘션] @');

bot.on(Event.MESSAGE, msg => {
    if (msg.room != "101") return;

    message.build(msg);
    container.execute(message);
});

function 아침() {
    var todayMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
    var tomorrowMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());

    var clock = {
        breakfast: Date.today().addHours(8).addMinutes(30),
        lunch: Date.today().addHours(13).addMinutes(30),
        dinner: Date.today().addHours(19).addMinutes(30)
    };

    if (new Date().isBefore(clock.breakfast)) {
        message.reply(todayMeal.breakfast.dishes.join('\n'));
    } else {
        message.reply(tomorrowMeal.breakfast.dishes.join('\n'));
    }
}
container.register(아침).option({ many: true });

function 점심() {
    var todayMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
    var tomorrowMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());

    var clock = {
        breakfast: Date.today().addHours(8).addMinutes(30),
        lunch: Date.today().addHours(13).addMinutes(30),
        dinner: Date.today().addHours(19).addMinutes(30)
    };

    if (new Date().isBefore(clock.lunch)) {
        message.reply(todayMeal.lunch.dishes.join('\n'));
    } else {
        message.reply(tomorrowMeal.lunch.dishes.join('\n'));
    }
}
container.register(점심).option({ many: true });

function 저녁() {
    var todayMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
    var tomorrowMeal = School.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());

    var clock = {
        breakfast: Date.today().addHours(8).addMinutes(30),
        lunch: Date.today().addHours(13).addMinutes(30),
        dinner: Date.today().addHours(19).addMinutes(30)
    };

    if (new Date().isBefore(clock.dinner)) {
        message.reply(todayMeal.dinner.dishes.join('\n'));
    } else {
        message.reply(tomorrowMeal.dinner.dishes.join('\n'));
    }
}
container.register(저녁).option({ many: true });

// const PREFIX = 
// const PATH = 'sdcard/msgbot/Data/todo.json'
// const FS = FileStream;

// // 0일째 는 없으니까 앞은 없고, 윤년 때문에 366번째 인덱스까지, 총 길이 367
// FS.load = (path) => FS.exists(path) ? FS.read(path) : Array.from(Array(367), () => new Array());

// const format = function (string) {
// 	let options = Array.from(arguments).slice(1);

// 	if (options.length == 1 && options[0] instanceof Object) {
// 		return string.replace(/{(.*?)}/g, (_, g1) => options[0][g1.trim()]);
// 	} else {
// 		let last = 0;
// 		return string.replace(/{(.*?)}/g, (matched, g1) => (g1 === "" ? options[++last - 1] : options[g1] || matched));
// 	}
// };

// const on_message = (msg) => {
//     if (!msg.content.startsWith(PREFIX)) return;

//     msg.content = msg.content.substring(9);
//     var splited = msg.content.split(/ +|\\n+/).slice(1);

//     msg.content = splited.join(' ');
//     msg.options = splited;
//     msg.replyf = function () { msg.reply(format.apply(null, arguments)); }
    
//     // yes ✅ no ⛔ 🗓️📆📅
//     var calender = FS.load(PATH);

//     commands[msg.options[0]](msg, calender);

//     /* 과제 저장 */
//     added_hwork = new Task(subjects.물리실험, '클래스룸 설문지 하기', new Date("2022/03/25"));
//     calender[added_hwork.date.getDayOfYear()].push(added_hwork);
//     FS.save(PATH, calender);
// };

// const commands = {
//     "과제": (msg, data) => {
//         var now = Date.getDayOfYear();
//         var string = String();

//         for (let i = now; i < now + 7; i++) {
//             string += format("{}요일 {}\n", Date.dayLabelList()[now % 7], (i < 3) ? (i < 2) ? (i < 1) ? '(오늘)' : '(내일)' : '(모레)' : '');
            
//             if (calender[i].length == 0) {
//                 string += "  ■ 아직은 없습니다.\n";
//             }
//             else {
//                 for (let j = 0; j < calender[i].length; j++) {
//                     string += format("  ■ {} 🏷️{}\n", calender[i][j].content, calender[i][j].subject);
//                 }
//             }
//         }

//         msg.reply(string);
//     },

//     /** $어제, $오늘, $내일, $모레
//      * 과제, 시간표, 급식 등 출력
//      */

//     // $캘린더
//     // $시간표
//     // $급식
//     // 에타에서 기상곡 불러오기
// }