var Date = require('new_date');
var len = require('utils');

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

    addDailySchedule: function(content, date) {
        if (date == null) date = new Date();
        for (let i = date.getDayOfYear(); i < len(this.cals); i++) {
            this.cals[i].push(content);
        }

        return this;
    },

    addWeeklySchedule: function(content, date) {
        if (date == null) date = new Date();
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

        while (i <= (Date.isLeapYear(new Date().getFullYear()) ? 366 : 365)) {
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

    getRange: function (from, to) {
        return this.cals.slice(from || Date.getDayOfYear(), (to || (Date.getDayOfYear() + 5)) + 1);
    }
};

const teachers = {
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    MrTorres: new Teacher('MrTorres'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????'),
    ?????????: new Teacher('?????????')
};

const classes = {
    ??????: new Class('??????').addTeachers(teachers.?????????).addWeeks('mon'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('mon'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('mon'),
    ??????: new Class('??????').addTeachers().addWeeks('mon'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('mon', 'thu'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('mon'),
    ????????????: new Class('????????????').addTeachers(teachers.?????????).addWeeks('tue'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('tue', 'fri'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('tue'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('tue', 'fri'),
    ??????: new Class('??????').addTeachers(teachers.?????????).addWeeks('tue'),
    ????????????: new Class('????????????').addTeachers(teachers.?????????).addWeeks('wed'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('wed'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('wed'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('wed'),
    RnE: new Class('RnE').addTeachers().addWeeks('wed'),
    ??????1A: new Class('??????1A').addTeachers(teachers.?????????).addWeeks('thu', 'fri'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('thu'),
    ??????: new Class('??????').addTeachers(teachers.?????????).addWeeks('thu'),
    ??????1C: new Class('??????1C').addTeachers(teachers.MrTorres, teachers.?????????).addWeeks('thu'),
    ??????2A: new Class('??????2A').addTeachers(teachers.?????????).addWeeks('thu', 'fri'),
    ????????????: new Class('????????????').addTeachers(teachers.?????????).addWeeks('thu'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('fri'),
    ??????1B: new Class('??????1B').addTeachers(teachers.?????????).addWeeks('fri'),
    ??????2B: new Class('??????2B').addTeachers(teachers.?????????).addWeeks('fri')
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

// var calendar = new Calender();
// calendar.setWeeklySchedule({
//     mon: [
//         classes.??????,
//         classes.??????,
//         classes.??????1B,
//         classes.??????1B,
//         classes.??????,
//         classes.??????1A,
//         classes.??????1B
//     ],

//     tue: [
//         classes.????????????,
//         classes.??????1A,
//         classes.??????1B,
//         classes.??????1A,
//         classes.??????,
//         classes.??????,
//     ],

//     wed: [
//         classes.????????????,
//         classes.??????1A,
//         classes.??????1A,
//         classes.??????1A,
//         classes.??????1A,
//         classes.??????1A,
//         classes.RnE,
//         classes.RnE,
//         classes.RnE,
//     ],

//     thu: [
//         classes.??????1A,
//         classes.??????1A,
//         classes.??????1B,
//         classes.??????,
//         classes.??????1C,
//         classes.??????2A,
//         classes.????????????,
//     ],

//     fri: [
//         classes.??????1B,
//         classes.??????1A,
//         classes.??????1B,
//         classes.??????1A,
//         classes.??????2A,
//         classes.??????1A,
//         classes.??????2B,
//     ],

//     sat: [

//     ],

//     sun: [

//     ]
// });

module.exports = {
    getMeal: getMeal,
    getDateString: getDateString,
    Teacher: Teacher,
    Class: Class,
    Calender: Calender
};