const bot = BotManager.getCurrentBot();
var status = 2;

function get_date_str (date) {
    var sYear = date.getFullYear();
    var sMonth = date.getMonth() + 1;
    var sDate = date.getDate();

    sMonth = sMonth > 9 ? sMonth : "0" + sMonth;
    sDate  = sDate > 9 ? sDate : "0" + sDate;
    return sYear + sMonth + sDate;
}

Date.prototype.isMatch = function (h, m) {
    return this.getHours() == h && this.getMinutes() == m && this.getSeconds() == 0;
}

function onMessage(msg) {
    if (msg.room != "t") return;

    while (true) {
        var date = new Date();

        // 아침 7:30
        if (date.isMatch(7, 30) && (status % 3 == 0)) {
            var data = JSON.parse(org.jsoup.Jsoup.connect(
                "https://open.neis.go.kr/hub/mealServiceDietInfo?" +
                "KEY=f74ccd1302b44c6fafd38616933d9b2c&" +
                "Type=json&" +
                "ATPT_OFCDC_SC_CODE=F10&" +
                "SD_SCHUL_CODE=7380031&" +
                "MLSV_YMD="+get_date_str(date)
            ).ignoreContentType(true).ignoreHttpErrors(true).post().text());

            const 조식 = data.mealServiceDietInfo[1].row[0];
            const 조식메뉴 = 조식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
            const 조식열량 = 조식.CAL_INFO;

            msg.reply("☁ 아침\n━━━━\n" + 조식메뉴);
            status++;
        }

        // 점심 12:40
        if (date.isMatch(12, 40) && (status % 3 == 1)) {
            var data = JSON.parse(org.jsoup.Jsoup.connect(
                "https://open.neis.go.kr/hub/mealServiceDietInfo?" +
                "KEY=f74ccd1302b44c6fafd38616933d9b2c&" +
                "Type=json&" +
                "ATPT_OFCDC_SC_CODE=F10&" +
                "SD_SCHUL_CODE=7380031&" +
                "MLSV_YMD="+get_date_str(date)
            ).ignoreContentType(true).ignoreHttpErrors(true).post().text());

            const 중식 = data.mealServiceDietInfo[1].row[1];
            const 중식메뉴 = 중식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
            const 중식열량 = 중식.CAL_INFO;

            msg.reply("☀ 점심\n━━━━\n" + 중식메뉴);
            status++;
        }

        // 저녁 18:30
        if (date.isMatch(18, 30) && (status % 3 == 2)) {
            var data = JSON.parse(org.jsoup.Jsoup.connect(
                "https://open.neis.go.kr/hub/mealServiceDietInfo?" +
                "KEY=f74ccd1302b44c6fafd38616933d9b2c&" +
                "Type=json&" +
                "ATPT_OFCDC_SC_CODE=F10&" +
                "SD_SCHUL_CODE=7380031&" +
                "MLSV_YMD="+get_date_str(date)
            ).ignoreContentType(true).ignoreHttpErrors(true).post().text());

            const 석식 = data.mealServiceDietInfo[1].row[2];
            const 석식메뉴 = 석식.DDISH_NM.replace(/\d+./g, '').replace(/ /g, '\n');
            const 석식열량 = 석식.CAL_INFO;

            msg.reply("🌙 저녁\n━━━━\n" + 석식메뉴);
            status++;
        }
        
        java.lang.Thread.sleep(1000);
    }
}
bot.addListener(Event.MESSAGE, onMessage);