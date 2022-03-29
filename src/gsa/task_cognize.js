// 자연어 알아듣기
function Teacher(name) {
    this.name = name;
}

function Subject(title, teacher, date){
    this.title = title;
    this.teacher = teacher;
    this.date = Array.isArray(date) ? date : [date];
}

function Task(subject, content='', date=[]) {
    this.subject = subject;
    this.content = content;
    this.date = Array.isArray(date) ? date : [date];
    this.repeat = {
        every: null, // 매번, 매달, 매일, 매주 등
        until: false,
    };
}

const dayLabels = {
    월: 'MON',
    화: 'TUE',
    수: 'WED',
    목: 'THU',
    금: 'FRI',
    토: 'SAT',
    일: 'SUN',
};

const repeatKinds = {
    일: 'DAY',
    주: 'WEEK',
    월: 'MONTH',
    달: 'MONTH',
    수업: 'CLASS',
    번: 'CLASS'
};

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
};

const subjects = {
    사회: new Subject('사회', teachers.정지현, dayLabels['월']),
    국어1B: new Subject('국어1B', teachers.강보라, dayLabels['월']),
    생물1B: new Subject('생물1B', teachers.김영준, dayLabels['월']),
    창의: new Subject('창의', null, dayLabels['월']),
    화학1A: new Subject('화학1A', teachers.이선미, [dayLabels['월'], dayLabels['목']]),
    영어1B: new Subject('영어1B', teachers.장송이, dayLabels['월']),

    화학실험: new Subject('화학실험', teachers.박자화, dayLabels['화']),
    수학1A: new Subject('수학1A', teachers.김주형, [dayLabels['화'], dayLabels['금']]),
    수학1B: new Subject('수학1B', teachers.윤오상, dayLabels['화']),
    물리1A: new Subject('물리1A', teachers.이광현, [dayLabels['화'], dayLabels['금']]),
    정보: new Subject('정보', teachers.우준선, dayLabels['화']),

    물리실험: new Subject('물리실험', teachers.설영찬, dayLabels['수']),
    생물1A: new Subject('생물1A', teachers.이동수, dayLabels['수']),
    영어1A: new Subject('영어1A', teachers.조은아, dayLabels['수']),
    국어1A: new Subject('국어1A', teachers.심윤희, dayLabels['수']),
    RnE: new Subject('RnE', null, dayLabels['수']),

    지구1A: new Subject('지구1A', teachers.김명환, [dayLabels['목'], dayLabels['금']]),
    화학1B: new Subject('화학1B', teachers.유유희, dayLabels['목']),
    체육: new Subject('체육', teachers.정재민, dayLabels['목']),
    영어1C: new Subject('영어1C', [teachers.MrTorres, teachers.박새별], dayLabels['목']),
    수학2A: new Subject('수학2A', teachers.김경미, [dayLabels['목'], dayLabels['금']]),
    생물실험: new Subject('생물실험', teachers.정수진, dayLabels['목']),

    지구1B: new Subject('지구1B', teachers.조현웅, dayLabels['금']),
    물리1B: new Subject('물리1B', teachers.최용석, dayLabels['금']),
    수학2B: new Subject('수학2B', teachers.심규철, dayLabels['금'])
};

const regexs = {
    요일: /([월화수목금토일])요일/,
    날짜: /(\d+일)|(\d+월)/,
    반복: /(?:매|격)(일|주|월|달|번|수업)/, // 매일 -> 요일이나 일 지정 없음, 매주 -> 요일 지정, 매월 -> 일 지정, 매번, 매수업 -> 요일
    
    //까지
};

function cognize(string, regex) {
    var arr = string.split(/\\n| /);
    var task = new Task();

    let flag = false;

    arr.forEach(str => {
        let m1 = str.match(regex.요일);
        let m2 = str.match(regex.날짜);
        let m3 = str.match(regex.반복);

        if (str.startsWith('@')) {
            task.subject = subjects[str.slice(1)];
        }

        else if (m1 != null) {
            task.date.push(dayLabels[m1[1]]);
        }
        
        else if (m2 != null) {
            task.date.push(m2[1]);
        }
        
        else if (m3 != null) {
            if (repeatKinds[m3[1]] == 'CLASS') {
               flag = true; 
            }
            task.repeat.every = (repeatKinds[m3[1]]);
        }

        else {
            task.content += (str + ' ');
        }
    });
    task.content = task.content.trim();

    if (flag) {
        task.date = task.subject.date;
    }

    return task;
}

const samples = [
    "@생물실험 보고서 쓰기 매주 수요일",
    "매번 로그 쓰기 @영어1B",
    "매달 읭 dmld dmldmefijefjef @체육 ㅑ더랴ㅓㅈㄷㄹ 28일",
    "매 7월 19일 어머니께 생신 카드 보내기",
    "격주 수요일마다 재활용 내놓기"
];

for (i of samples) {
    let result = cognize(i, regexs);
    console.log(`\n>> "${i}" 해석 결과`+
                        `\n과목: `+
                        `\n  ㄴ 과목명: "${result.subject.title}"`+
                        `\n  ㄴ 선생님명: "${result.subject.teacher.name}"`+
                        `\n  ㄴ 일정: ${JSON.stringify(result.subject.date)}`+
                        `\n과제 내용: "${result.content}"`+
                        `\n과제 일정: ${JSON.stringify(result.date)}`+
                        `\n과제 반복: `+
                        `\n  ㄴ 주기: ${result.repeat.every}`+
                        `\n  ㄴ 기한: ${result.repeat.until}\n`
                );
}