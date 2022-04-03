Date = require('../module/date/module');
const PREFIX = '[나를 멘션] @'
const PATH = 'sdcard/msgbot/Data/todo.json'
const FS = FileStream;

// 0일 째 는 없으니까 앞은 없고, 윤년 때문에 366번째 인덱스까지, 총 길이 367
FS.load = (path) => FS.exists(path) ? FS.read(path) : Array.from(Array(367), () => new Array());

const format = function (string) {
	let options = Array.from(arguments).slice(1);

	if (options.length == 1 && options[0] instanceof Object) {
		return string.replace(/{(.*?)}/g, (_, g1) => options[0][g1.trim()]);
	} else {
		let last = 0;
		return string.replace(/{(.*?)}/g, (matched, g1) => (g1 === "" ? options[++last - 1] : options[g1] || matched));
	}
};

const on_message = (msg) => {
    if (!msg.content.startsWith(PREFIX)) return;

    msg.content = msg.content.substring(9);
    var splited = msg.content.split(/ +|\\n+/).slice(1);

    msg.content = splited.join(' ');
    msg.options = splited;
    msg.replyf = function () { msg.reply(format.apply(null, arguments)); }
    
    // yes ✅ no ⛔ 🗓️📆📅
    var calender = FS.load(PATH);

    commands[msg.options[0]](msg, calender);

    /* 과제 저장 */
    added_hwork = new Task(subjects.물리실험, '클래스룸 설문지 하기', new Date("2022/03/25"));
    calender[added_hwork.date.getDayOfYear()].push(added_hwork);
    FS.save(PATH, calender);
};

const commands = {
    "과제": (msg, data) => {
        var now = Date.getDayOfYear();
        var string = String();

        for (let i = now; i < now + 7; i++) {
            string += format("{}요일 {}\n", Date.dayLabelList()[now % 7], (i < 3) ? (i < 2) ? (i < 1) ? '(오늘)' : '(내일)' : '(모레)' : '');
            
            if (calender[i].length == 0) {
                string += "  ■ 아직은 없습니다.\n";
            }
            else {
                for (let j = 0; j < calender[i].length; j++) {
                    string += format("  ■ {} 🏷️{}\n", calender[i][j].content, calender[i][j].subject);
                }
            }
        }

        msg.reply(string);
    },

    /** $어제, $오늘, $내일, $모레
     * 과제, 시간표, 급식 등 출력
     */

    // $캘린더
    // $시간표
    // $급식
    // 에타에서 기상곡 불러오기
}