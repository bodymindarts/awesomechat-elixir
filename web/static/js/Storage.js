'use strict';

var writeLoggedInUser = function(user){
  localStorage.setItem('currentUser', user);
};

var removeLoggedInUser = function() {
  localStorage.removeItem('currentUser');
};

var readLoggedInUser = function (){
  return localStorage.getItem('currentUser');
};

var writeHistory = function(history) {
  localStorage.setItem('history', JSON.stringify(history));
};

var readHistory = function() {
  return JSON.parse(localStorage.getItem('history'));
};

module.exports = {
  'writeLoggedInUser': writeLoggedInUser,
  'readLoggedInUser': readLoggedInUser,
  'removeLoggedInUser': removeLoggedInUser,
  'writeHistory': writeHistory,
  'readHistory': readHistory
};
