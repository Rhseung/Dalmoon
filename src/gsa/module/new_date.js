var $D = Date;
var $P = $D.prototype;

$P.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);

    return this;
};

$P.setTimeToNow = function () {
    var now = new Date();

    this.setHours(now.getHours());
    this.setMinutes(now.getMinutes());
    this.setSeconds(now.getSeconds());
    this.setMilliseconds(now.getMilliseconds());

    return this;
};

$D.dayLabelList = function() {
    var labelList = [];
    var dayLabelName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

    for (let i = 0; i < 7; i++) {
        labelList[i] = dayLabelName[(new Date((new Date().getFullYear()) + "/1/1").getDay() + i) % 7];
    }

    return labelList;
};

$P.getDayLabel = function() {
    var dayLabelName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    return dayLabelName[new Date().getDay()];
};

$D.today = function () {
    return new Date().clearTime();
};

$D.getDayOfYear = function ()  {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

$D.isLeapYear = function (year) { 
    return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0); 
};

$D.getDaysInMonth = function (year, month=false) {
    return month ? [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
                    : [31, ($D.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

$P.clone = function () {
    return new Date(this.getTime()); 
};

$P.equals = function (date) {
    return Date.equals(this, date || new Date());
};

$P.between = function (start, end) {
    return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
};

$P.isAfter = function (date) {
    return this.compareTo(date || new Date()) === 1;
};

$P.isBefore = function (date) {
    return (this.compareTo(date || new Date()) === -1);
};

$P.isToday = $P.isSameDay = function (date) {
    return this.clone().clearTime().equals((date || new Date()).clone().clearTime());
};

$P.getDayOfYear = function ()  {
    var start = new Date(this.getFullYear(), 0, 0);
    var diff = (this - start) + ((start.getTimezoneOffset() - this.getTimezoneOffset()) * 60 * 1000);
    
    return Math.floor(diff / (1000 * 60 * 60 * 24));
};

$P.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value * 1);
    return this;
};

$P.addSeconds = function (value) { 
    return this.addMilliseconds(value * 1000); 
};

$P.addMinutes = function (value) { 
    return this.addMilliseconds(value * 60000); /* 60*1000 */
};

$P.addHours = function (value) { 
    return this.addMilliseconds(value * 3600000); /* 60*60*1000 */
};

$P.addDays = function (value) {
    this.setDate(this.getDate() + value * 1);
    return this;
};

$P.addWeeks = function (value) { 
    return this.addDays(value * 7);
};

$P.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value * 1);
    this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));
    return this;
};

$P.addYears = function (value) {
    return this.addMonths(value * 12);
};

module.exports = $D;