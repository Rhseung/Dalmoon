const bot = BotManager.getCurrentBot();
var { Keyword, KeywordGroup } = require('command_handler.js');

const WHAT = new Keyword(
    "뭐_", "뭔_", "머_", "먼"
);

const MEAL = {
    BREAKFAST: new Keyword("아침", "조식", "breakfast"),
    LUNCH: new Keyword("점심", "중식", "lunch"),
    DINNER: new Keyword("저녁", "석식", "dinner")
};

const AFTER = {
    그글피: new Keyword("그~글피")
}

const breakfast = new KeywordGroup(
    WHAT,
    "오늘",
    MEAL.BREAKFAST
).option({ turn: false });

const lunch = new KeywordGroup(
    new Keyword("뭐_", "뭔_", "머_", "먼"), // ["뭐_", "뭔_", "머_", "먼"] 도 됨
    "오늘",
    new Keyword("점심", "중식", "lunch")
).option({ turn: false });

const MEAL = new KeywordTree({
    WHAT:
        오늘:
            
});

bot.on(Event.MESSAGE, msg => {
    [breakfast, lunch].goin(msg);
    
    breakfast.route(() => {
        msg.reply("hi~");
    });

    lunch.route(() => {
        msg.reply("efwfwfwf");
    });
});