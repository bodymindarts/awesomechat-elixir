'use strict';

var Immutable = require('immutable');
var MessageHistory = require('./domain/MessageHistory');

module.exports = {
  'init': function(state, channel) {

    channel.on("new_msg", (message) => {
      var confirmed = state.cursor(['history', 'confirmed']);
      var pending = state.cursor(['history', 'pending']);

      confirmed.update((current) => MessageHistory.add(current, message));
      pending.update((current) => MessageHistory.remove(current, message));
    });

    channel.on("sync", (message) => {
      var confirmed = state.cursor(['history', 'confirmed']);
      confirmed.update(() => new Immutable.List(message.history));
    });
  }
};
