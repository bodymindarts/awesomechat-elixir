'use strict';

var ScoreGenerator = require('./ScoreGenerator');

var pending = function(userName, text) {

  var now = new Date();
  var timeStamp = now.toISOString();
  var score = ScoreGenerator.forDate(now);
  var id = score.concat('-', userName);

  return {
    id: id,
    score: score,
    user: userName,
    text: text,
    pending: true,
    timeStamp: timeStamp
  };
};

module.exports = {
  'pending': pending
};
