var Date = require('./new_date');
var len = require('./utils');

/**
 * @param {String} name 
 */
function Teacher(name) {
    this.name = name;
}

/**
 * @param {String} name
 * @param {Set<Teacher>} teacher 
 * @param {Set<String>} week
 */
function Class(name) {
    this.name;
    this.teacher = new Set();
    this.week = new Set();
}

Class.prototype = {
    /**
     * @param {Teacher[]} teachers
     * @returns {Class} class
     */
    addTeachers: function() {
        for (arg of arguments) {
            this.teacher.add(arg);
        }

        return this;
    },

    /**
     * @param {String[]} daylabels
     * @returns {Class} class
     */
    addWeeks: function() {
        for (arg of arguments) {
            this.week.add(arg);
        }

        return this;
    }
};

/**
 * 
 */
function Calender() {
    this.cals = Array.from(Array(Date.isLeapYear(new Date().getFullYear()) ? 366+1 : 365+1),
                    () => new Array());
}

Calender.prototype = {
    // addSchedule: function(content, date, repeat = false) {
    //     if (repeat == false) this.cals[date.getDayOfYear()].push(content);
    //     else {
    //         switch (repeat) {
    //             case "everyday":
    //                 for (let i = date.getDayOfYear(); i < len(this.cals); i++) {
    //                     this.cals[i] = content;
    //                 }
    //             case "week":
                    
    //             case "week":
    //         }
    //     }

    //     return this;
    // },

    addDailySchedule: function(content, date = new Date()) {
        for (let i = date.getDayOfYear(); i < len(this.cals); i++) {
            this.cals[i].push(content);
        }

        return this;
    },

    addWeeklySchedule: function(content, date = new Date()) {
        let i = date.getDayOfYear();

        while (i <= (Date.isLeapYear ? 366 : 365)) {
            this.cals[i].push(content);
            i += 7;
        }

        return this;
    },

    addMonthlySchedule: function(content) {
        let m = new Date().getMonth();
        let i = Date.getDayOfYear();

        while (i <= (Date.isLeapYear ? 366 : 365)) {
            this.cals[i].push(content);
            i += Date.getDaysInMonth(m);
            m++;
        }

        return this;
    },

    setWeeklySchedule: function(schedule) {
        this.cals = this.cals.map((v, i) => {
            if (i == 0) return;
            return v.concat(schedule[Date.dayLabelList()[(i-1) % 7]] || []);
        });

        return this;
    },

    getRange: function (from = Date.getDayOfYear(), to = (Date.getDayOfYear() + 6)) {
        return this.cals.slice(from, to + 1);
    }
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
    심규철: new Teacher('심규철')
};

const classes = {
    사회: new Class('사회').addTeachers(teachers.정지현).addWeeks('mon'),
    국어1B: new Class('국어1B').addTeachers(teachers.강보라).addWeeks('mon'),
    생물1B: new Class('생물1B').addTeachers(teachers.김영준).addWeeks('mon'),
    창체: new Class('창체').addTeachers().addWeeks('mon'),
    화학1A: new Class('화학1A').addTeachers(teachers.이선미).addWeeks('mon', 'thu'),
    영어1B: new Class('영어1B').addTeachers(teachers.장송이).addWeeks('mon'),
    화학실험: new Class('화학실험').addTeachers(teachers.박자화).addWeeks('tue'),
    수학1A: new Class('수학1A').addTeachers(teachers.김주형).addWeeks('tue', 'fri'),
    수학1B: new Class('수학1B').addTeachers(teachers.윤오상).addWeeks('tue'),
    물리1A: new Class('물리1A').addTeachers(teachers.이광현).addWeeks('tue', 'fri'),
    정보: new Class('정보').addTeachers(teachers.우준선).addWeeks('tue'),
    물리실험: new Class('물리실험').addTeachers(teachers.설영찬).addWeeks('wed'),
    생물1A: new Class('생물1A').addTeachers(teachers.이동수).addWeeks('wed'),
    영어1A: new Class('영어1A').addTeachers(teachers.조은아).addWeeks('wed'),
    국어1A: new Class('국어1A').addTeachers(teachers.심윤희).addWeeks('wed'),
    RnE: new Class('RnE').addTeachers().addWeeks('wed'),
    지구1A: new Class('지구1A').addTeachers(teachers.김명환).addWeeks('thu', 'fri'),
    화학1B: new Class('화학1B').addTeachers(teachers.유유희).addWeeks('thu'),
    체육: new Class('체육').addTeachers(teachers.정재민).addWeeks('thu'),
    영어1C: new Class('영어1C').addTeachers(teachers.MrTorres, teachers.박새별).addWeeks('thu'),
    수학2A: new Class('수학2A').addTeachers(teachers.김경미).addWeeks('thu', 'fri'),
    생물실험: new Class('생물실험').addTeachers(teachers.정수진).addWeeks('thu'),
    지구1B: new Class('지구1B').addTeachers(teachers.조현웅).addWeeks('fri'),
    물리1B: new Class('물리1B').addTeachers(teachers.최용석).addWeeks('fri'),
    수학2B: new Class('수학2B').addTeachers(teachers.심규철).addWeeks('fri')
};

/**
 * @param {Date} date 
 * @returns {String} date string formats like YYYYMMDD
 */
function getDateString(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month > 9 ? month : "0" + month;
    day  = day > 9 ? day : "0" + day;
    return year + month + day;
}

/**
 * @param {String} APIkey 
 * @param {String} areaCode 
 * @param {String} schoolCode 
 * @param {Date} date 
 * @returns {Object} Meal Infomations
 */
function getMeal(APIkey, areaCode, schoolCode, date) {
    let data = JSON.parse(
        org.jsoup.Jsoup.connect(
            "https://open.neis.go.kr/hub/mealServiceDietInfo?" +
            "KEY=" + APIkey +
            "&Type=json" + 
            "&ATPT_OFCDC_SC_CODE=" + areaCode +
            "&SD_SCHUL_CODE=" + schoolCode +
            "&MLSV_YMD=" + getDateString(date)
        ).ignoreContentType(true).ignoreHttpErrors(true).post().text()
    );

    return (data.mealServiceDietInfo[0].head[2].RESULT.CODE == "INFO-000") ? {
        breakfast: {
            calorie: data.mealServiceDietInfo[1].row[0].CAL_INFO,
            dishes: data.mealServiceDietInfo[1].row[0].DDISH_NM.replace(/ ?\(.*?\)/g, '').trim().split(' ')
        },
        lunch: {
            calorie: data.mealServiceDietInfo[1].row[1].CAL_INFO,
            dishes: data.mealServiceDietInfo[1].row[1].DDISH_NM.replace(/ ?\(.*?\)/g, '').trim().split(' ')
        },
        dinner: {
            calorie: data.mealServiceDietInfo[1].row[2].CAL_INFO,
            dishes: data.mealServiceDietInfo[1].row[2].DDISH_NM.replace(/ ?\(.*?\)/g, '').trim().split(' ')
        },
        result: {
            code: "INFO-000",
            isSuccess: true
        }
    } : {
        result: {
            code: data.mealServiceDietInfo[0].head[2].RESULT.CODE,
            isSuccess: false
        }            
    };
}

var calendar = new Calender();
calendar.setWeeklySchedule({
    mon: [
        classes.사회,
        classes.사회,
        classes.국어1B,
        classes.생물1B,
        classes.창체,
        classes.화학1A,
        classes.영어1B
    ],

    tue: [
        classes.화학실험,
        classes.수학1A,
        classes.수학1B,
        classes.물리1A,
        classes.정보,
        classes.정보,
    ],

    wed: [
        classes.물리실험,
        classes.생물1A,
        classes.생물1A,
        classes.영어1A,
        classes.국어1A,
        classes.국어1A,
        classes.RnE,
        classes.RnE,
        classes.RnE,
    ],

    thu: [
        classes.화학1A,
        classes.지구1A,
        classes.화학1B,
        classes.체육,
        classes.영어1C,
        classes.수학2A,
        classes.생물실험,
    ],

    fri: [
        classes.지구1B,
        classes.물리1A,
        classes.물리1B,
        classes.지구1A,
        classes.수학2A,
        classes.수학1A,
        classes.수학2B,
    ],

    sat: [

    ],

    sun: [

    ]
});

module.exports = {
    getMeal: getMeal,
    getDateString: getDateString,
    Teacher: Teacher,
    Class: Class,
    Calender: Calender
};