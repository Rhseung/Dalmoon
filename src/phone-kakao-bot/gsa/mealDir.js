const bot = BotManager.getCurrentBot();

function get_date_str(date)
{
    var sYear = date.getFullYear();
    var sMonth = date.getMonth() + 1;
    var sDate = date.getDate();

    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate  = sDate > 9 ? sDate : "0" + sDate;
    return sYear + sMonth + sDate;
}

bot.on(Event.MESSAGE, (msg) => {
    if (msg.room != "Dev") return;

    var date = new Date();

    var data = org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?" +
                                        "KEY=f74ccd1302b44c6fafd38616933d9b2c&" +
                                        "Type=json&" +
                                        "ATPT_OFCDC_SC_CODE=F10&" +
                                        "SD_SCHUL_CODE=7380031&" +
                                        "MLSV_YMD="+get_date_str(date))
                .ignoreContentType(true).ignoreHttpErrors(true)
                .post().text();
    data = JSON.parse(data);

    const 조식 = data.mealServiceDietInfo[1].row[0];
    const 중식 = data.mealServiceDietInfo[1].row[1];
    const 석식 = data.mealServiceDietInfo[1].row[2];
    
    const 조식메뉴 = 조식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
    const 조식열량 = 조식.CAL_INFO;
    const 중식메뉴 = 중식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
    const 중식열량 = 중식.CAL_INFO;
    const 석식메뉴 = 석식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
    const 석식열량 = 석식.CAL_INFO;

    if (/(?:조식|아침)(이)? *(?:뭐|머)/.test(msg.content)) {
        msg.reply("☁ 아침\n━━━━\n" + 조식메뉴);
    }

    if (/(?:중식|점심)(이)? *(?:뭐|머)/.test(msg.content)) {
        msg.reply("☀ 점심\n━━━━\n" + 중식메뉴);
    }

    if (/(?:석식|저녁)(이)? *(?:뭐|머)/.test(msg.content)) {
        msg.reply("🌙 저녁\n━━━━\n" + 석식메뉴);
    }
});