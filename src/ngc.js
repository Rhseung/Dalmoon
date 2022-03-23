function Question(mean, ques) {
    this.mean = String(mean);
    this.ques = RegExp(ques);
};

function Answer(match, answ) {
    this.match = match;
    this.ques = answ;
}

var Quess = [];
var Answs = [];

Quess.push(new Questions('how', /(어떻게|어떠하\S|어떠한|어케)/));
Quess.push(new Questions('make', /(만드\S|제작하\S+)/));
Answs.push(new Answer(['how', 'make'], (msg, data) => {
    
}));

function understand(Keywords, message) {

}