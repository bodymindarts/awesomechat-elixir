'use strict';

var Immutable = require('immutable');
var immstruct = require('immstruct');

module.exports = immstruct({
  loggedIn: false,
  currentUser: '',
  history: {
    confirmed: new Immutable.List(),
    pending: new Immutable.List()
  },
  actions: {
    login: false,
    logout: false,
    send: false
  },
  inputs: {
    message: '',
    name: ''
  }
});
