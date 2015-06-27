'use strict';

var Immutable = require('immutable');
var MessageHistory = require('./domain/MessageHistory');

module.exports = {
  'init': function(state, socket) {

    socket.onmessage = function(event) {

      var message = JSON.parse(event.data);

      var confirmed = state.cursor(['history', 'confirmed']);
      var pending = state.cursor(['history', 'pending']);

      if(typeof message.id !== 'undefined') {
        confirmed.update((current) => MessageHistory.add(current, message));
        pending.update((current) => MessageHistory.remove(current, message));
      } else {
        confirmed.update(() => new Immutable.List(message));
      }
    };
  }
};
