'use strict';

var fillDigits = function(number, n) {

  var nZeros = 0;
  var zeros = '';
  while(number * Math.pow(10, nZeros) < Math.pow(10, n - 1)){
    nZeros += 1;
    zeros = zeros.concat('0');
  }

  return zeros.concat(number);
};


module.exports = {
  'forDate': function(date) {

    var totalMilliseconds = date.getUTCHours() * 3600 * 1000 +
      date.getUTCMinutes() * 60 * 1000 +
      date.getUTCSeconds() * 1000 +
      date.getUTCMilliseconds();

    return ''.concat(
      date.getUTCFullYear(),
      fillDigits(date.getUTCMonth(), 2),
      fillDigits(date.getUTCDate(), 2),
      fillDigits(totalMilliseconds, 8)
    );
  }
};

