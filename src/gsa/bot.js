const bot = BotManager.getCurrentBot();
const COMPRESS = "\n" + "\u200b".repeat(500);
var { Container, Message } = require('Mp2.js'); 

var container = new Container();
var message = new Message();

bot.on(Event.MESSAGE, msg => {
    if (msg.room != "101") return;

    message.build(msg);
    container.execute(message);
});

Date.prototype.addDays = function (value) {
    this.setDate(this.getDate() + value * 1);
    return this;
};

const school = {
    /**
     * @param {Date} date 
     * @returns {String} date string formats like YYYYMMDD
     */
    getDateString: function(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month > 9 ? month : "0" + month;
        day  = day > 9 ? day : "0" + day;
        return year + month + day;
    },

    /**
     * @param {String} APIkey 
     * @param {String} areaCode 
     * @param {String} schoolCode 
     * @param {Date} date 
     * @returns {Object} Meal Infomations
     */
    getMeal: function(APIkey, areaCode, schoolCode, date) {
        let data = JSON.parse(
            org.jsoup.Jsoup.connect(
                "https://open.neis.go.kr/hub/mealServiceDietInfo?" +
                "KEY=" + APIkey +
                "&Type=json" + 
                "&ATPT_OFCDC_SC_CODE=" + areaCode +
                "&SD_SCHUL_CODE=" + schoolCode +
                "&MLSV_YMD=" + school.getDateString(date)
            ).ignoreContentType(true).ignoreHttpErrors(true).post().text()
        );

        return (data.mealServiceDietInfo[0].head[1].RESULT.CODE == "INFO-000") ? {
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
        }
    }
};

const command = {
    아침: function() {
        var todayMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
        var tomorrowMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date().addDays(1));

        var clock = {};
        clock.breakfast = new Date();
        clock.lunch = new Date();
        clock.dinner = new Date();
        clock.breakfast.setHours(8, 30, 0);
        clock.lunch.setHours(13, 30, 0);
        clock.dinner.setHours(19, 30, 0);

        if (new Date() < clock.breakfast) {
            message.reply("🍳 오늘 아침\n━━━━━━\n" + todayMeal.breakfast.dishes.join('\n') + COMPRESS + "\n칼로리: " + todayMeal.breakfast.calorie);
        } else {
            message.reply("🍳 내일 아침\n━━━━━━\n" + tomorrowMeal.breakfast.dishes.join('\n') + COMPRESS + "\n칼로리: " + tomorrowMeal.breakfast.calorie);
        }
    },

    점심: function() {
        var todayMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
        var tomorrowMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date().addDays(1));

        var clock = {};
        clock.breakfast = new Date();
        clock.lunch = new Date();
        clock.dinner = new Date();
        clock.breakfast.setHours(8, 30, 0);
        clock.lunch.setHours(13, 30, 0);
        clock.dinner.setHours(19, 30, 0);

        if (new Date() < clock.lunch) {
            message.reply("🍔 오늘 점심\n━━━━━━\n" + todayMeal.lunch.dishes.join('\n') + COMPRESS + "\n칼로리: " + todayMeal.lunch.calorie);
        } else {
            message.reply("🍔 내일 점심\n━━━━━━\n" + tomorrowMeal.lunch.dishes.join('\n') + COMPRESS + "\n칼로리: " + tomorrowMeal.lunch.calorie);
        }
    },

    저녁: function() {
        var todayMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date());
        var tomorrowMeal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, new Date().addDays(1));

        var clock = {};
        clock.breakfast = new Date();
        clock.lunch = new Date();
        clock.dinner = new Date();
        clock.breakfast.setHours(8, 30, 0);
        clock.lunch.setHours(13, 30, 0);
        clock.dinner.setHours(19, 30, 0);

        if (new Date() < clock.dinner) {
            message.reply("🍽️ 오늘 저녁\n━━━━━━\n" + todayMeal.dinner.dishes.join('\n') + COMPRESS + "\n칼로리: " + todayMeal.dinner.calorie);
        } else {
            message.reply("🍽️ 내일 저녁\n━━━━━━\n" + tomorrowMeal.dinner.dishes.join('\n') + COMPRESS + "\n칼로리: " + tomorrowMeal.dinner.calorie);
        }
    },

    그끄저께: function 그끄저께() {
        var d = new Date().addDays(-3);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    그제: function 그제() {
        var d = new Date().addDays(-2);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    어제: function 어제() {
        var d = new Date().addDays(-1);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    오늘: function 오늘() {
        var d = new Date().addDays(0);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    내일: function 내일() {
        var d = new Date().addDays(1);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    모레: function 모레() {
        var d = new Date().addDays(2);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    글피: function 글피() {
        var d = new Date().addDays(3);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    그글피: function 그글피() {
        var d = new Date().addDays(4);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n아직 급식 계획이 정해지지 않았어요.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n🍳 아침\n━━━━\n{breakfast}\n\n🍔 점심\n━━━━\n{lunch}\n\n🍽️ 저녁\n━━━━\n{dinner} {COMPRESS}\n총 칼로리: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    }
};
container.register(command.아침).aliase(/(?:조식|아침)(이)? *(?:뭐|머)?/).option({ many: true });
container.register(command.점심).aliase(/(?:중식|점심)(이)? *(?:뭐|머)?/).option({ many: true });
container.register(command.저녁).aliase(/(?:석식|저녁)(이)? *(?:뭐|머)?/).option({ many: true });
container.register(command.그끄저께);
container.register(command.그제);
container.register(command.어제);
container.register(command.오늘);
container.register(command.내일);
container.register(command.모레);
container.register(command.글피);
container.register(command.그글피);