const Date = require('./date_module');
const prefix = '/'
const path = 'sdcard/msgbot/Data/todo.json'
const FS = FileStream;

// 0일 째 는 없으니까 앞은 없고, 윤년 때문에 366번째 인덱스까지, 총 길이 367
FS.load = (path) => FS.exists(path) ? FS.read(path) : Array.from(Array(367), () => new Array());

/**
 * 과제 속성--
 * 쌤이름 <=> 과목명, 과제 제출기한, 과제 내용(array)
 * 
 * 자동 삭제--
 * 그 날 지나면 그 과제는 지워져야 함
 * 
 * 명령어들--
 * 미루기 화 -> 목
 * 추가 과목&쌤
 * (화요일|화) (김주형|주형|주형쌤|수학1A|수학 1A)
 * ㄴ 지정된 문제 발표하기(\n|, )lms에 미리 제출
 */

function Teacher(name) {
    this.name = name;
}

function Subject(title, teacher, date){
    this.title = title;
    this.teacher = teacher;
    this.date = date;
}

function Homework(subject, content, date) {
    this.subject = subject;
    this.content = content;
    this.date = date;
}

const teachers = {
    정지현: new Teacher('정지현'),
    심윤희: new Teacher('심윤희'),
    김영준: new Teacher('김영준'),
    이광현: new Teacher('이광현'),
    이선미: new Teacher('이선미'),
    장송이: new Teacher('장송이'),
    박자화: new Teacher('박자화'),
    김주형: new Teacher('김주형'),
    윤오상: new Teacher('윤오상'),
    우준선: new Teacher('우준선'),
    설영찬: new Teacher('설영찬'),
    이동수: new Teacher('이동수'),
    조은아: new Teacher('조은아'),
    김명환: new Teacher('김명환'),
    유유희: new Teacher('유유희'),
    정재민: new Teacher('정재민'),
    MrTorres: new Teacher('MrTorres'),
    박새별: new Teacher('박새별'),
    김경미: new Teacher('김경미'),
    정수진: new Teacher('정수진'),
    조현웅: new Teacher('조현웅'),
    최용석: new Teacher('최용석'),
    심규철: new Teacher('심규철'),
}

const subjects = {
    사회: new Subject('사회', teachers.정지현, '월'),
    창의: new Subject('창의', null, '월'),
    정보: new Subject('정보', teachers.우준선, '월'),
    RnE: new Subject('RnE', null, '월'),
    체육: new Subject('체육', teachers.정재민, '월'),

    화학실험: new Subject('화학실험', teachers.박자화, '월'),
    생물실험: new Subject('생물실험', teachers.정수진, '월'),
    물리실험: new Subject('물리실험', teachers.설영찬, '월'),

    국어1A: new Subject('국어1A', teachers.정지현, '월'),
    국어1B: new Subject('국어1B', teachers.정지현, '월'),

    영어1A: new Subject('영어1A', teachers.조은아, '월'),
    영어1B: new Subject('영어1B', [teachers.MrTorres, teachers.박새별], '월'),
    영어1C: new Subject('영어1C', teachers.장송이, '월'),

    물리1A: new Subject('물리1A', teachers.이광현, '월'),
    물리1B: new Subject('물리1B', teachers.최용석, '월'),

    화학1A: new Subject('화학1A', teachers.이선미, '월'),
    화학1B: new Subject('화학1B', teachers.유유희, '월'),

    생물1A: new Subject('생물1A', teachers.이동수, '월'),
    생물1B: new Subject('생물1B', teachers.김영준, '월'),

    지구1A: new Subject('지구1A', teachers.김명환, '월'),
    지구1B: new Subject('지구1B', teachers.조현웅, '월'),
    
    수학1A: new Subject('수학1A', teachers.김주형, '월'),
    수학1B: new Subject('수학1B', teachers.윤오상, '월'),
    수학2A: new Subject('수학2A', teachers.김경미, '월'),
    수학2B: new Subject('수학2B', teachers.심규철, '월')
}

const format = function (string) {
	let options = Array.from(arguments).slice(1);

	if (options.length == 1 && options[0] instanceof Object) {
		return string.replace(/{(.*?)}/g, (_, g1) => options[0][g1.trim()]);
	} else {
		let last = 0;
		return string.replace(/{(.*?)}/g, (matched, g1) => (g1 === "" ? options[++last - 1] : options[g1] || matched));
	}
};

const day_label = [
    '금', '토', '일', '월', '화', '수', '목'
];

const on_message = (msg) => {
    if (!msg.content.startsWith(prefix)) return;

    msg.content = msg.content.substring(1);
    msg.options = msg.content.split(' ');
    msg.replyf = function () { msg.reply(format.apply(null, arguments)); }
    
    // yes ✅ no ⛔
    var calender = FS.load(path); // 🗓️📆📅
    var now = Date.getDayOfYear();

    /* 과제 일반 출력 */
    var string = String();

    for (let i = now; i < now + 7; i++) {
        string += format("{}요일 {}\n", day_label[now % 7], (i < 3) ? (i < 2) ? (i < 1) ? '(오늘)' : '(내일)' : '(모레)' : '');
        
        if (calender[i].length == 0) {
            string += "  ■ 아직은 없습니다.\n";
        }
        else {
            for (let j = 0; j < calender[i].length; j++) {
                string += format("  ■ {} 🏷️{}\n", calender[i][j].content, calender[i][j].subject);
            }
        }
    }

    /* 과제 저장 */
    added_hwork = new Homework(subjects.물리실험, '클래스룸 설문지 하기', new Date("2022/03/25"));
    calender[added_hwork.date.getDayOfYear()].push(added_hwork);
    FS.save(path, calender);
};