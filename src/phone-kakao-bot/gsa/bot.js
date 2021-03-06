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
    ??????: function() {
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
            message.reply("???? ?????? ??????\n??????????????????\n" + todayMeal.breakfast.dishes.join('\n') + COMPRESS + "\n?????????: " + todayMeal.breakfast.calorie);
        } else {
            message.reply("???? ?????? ??????\n??????????????????\n" + tomorrowMeal.breakfast.dishes.join('\n') + COMPRESS + "\n?????????: " + tomorrowMeal.breakfast.calorie);
        }
    },

    ??????: function() {
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
            message.reply("???? ?????? ??????\n??????????????????\n" + todayMeal.lunch.dishes.join('\n') + COMPRESS + "\n?????????: " + todayMeal.lunch.calorie);
        } else {
            message.reply("???? ?????? ??????\n??????????????????\n" + tomorrowMeal.lunch.dishes.join('\n') + COMPRESS + "\n?????????: " + tomorrowMeal.lunch.calorie);
        }
    },

    ??????: function() {
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
            message.reply("??????? ?????? ??????\n??????????????????\n" + todayMeal.dinner.dishes.join('\n') + COMPRESS + "\n?????????: " + todayMeal.dinner.calorie);
        } else {
            message.reply("??????? ?????? ??????\n??????????????????\n" + tomorrowMeal.dinner.dishes.join('\n') + COMPRESS + "\n?????????: " + tomorrowMeal.dinner.calorie);
        }
    },

    ????????????: function ????????????() {
        var d = new Date().addDays(-3);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(-2);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(-1);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(0);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(1);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(2);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ??????: function ??????() {
        var d = new Date().addDays(3);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
                            day: school.getDateString(d),
                            breakfast: meal.breakfast.dishes.join('\n'),
                            lunch: meal.lunch.dishes.join('\n'),
                            dinner: meal.dinner.dishes.join('\n'),
                            COMPRESS: COMPRESS,
                            kcal: Number(meal.breakfast.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.lunch.calorie.replace(/[a-zA-Z ]/g, '')) + Number(meal.dinner.calorie.replace(/[a-zA-Z ]/g, ''))
                        });
        }
    },

    ?????????: function ?????????() {
        var d = new Date().addDays(4);

        var meal = school.getMeal("f74ccd1302b44c6fafd38616933d9b2c", "F10", 7380031, d);
        if (!meal.result.isSuccess) {
            if (meal.result.code == "INFO-200") {
                message.replyf("[{}]\n\n?????? ?????? ????????? ???????????? ????????????.", school.getDateString(d));
            }
            else {
                message.reply("error occured");
            }
        }
        else {
            message.replyf("[{day}]\n\n???? ??????\n????????????\n{breakfast}\n\n???? ??????\n????????????\n{lunch}\n\n??????? ??????\n????????????\n{dinner} {COMPRESS}\n??? ?????????: {kcal} Kcal", {
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
container.register(command.??????).aliase(/(?:??????|??????)(???)? *(?:???|???)?/).option({ many: true });
container.register(command.??????).aliase(/(?:??????|??????)(???)? *(?:???|???)?/).option({ many: true });
container.register(command.??????).aliase(/(?:??????|??????)(???)? *(?:???|???)?/).option({ many: true });
container.register(command.????????????);
container.register(command.??????);
container.register(command.??????);
container.register(command.??????);
container.register(command.??????);
container.register(command.??????);
container.register(command.??????);
container.register(command.?????????);