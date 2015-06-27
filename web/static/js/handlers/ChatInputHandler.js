'use strict';

var MessageHistory = require('../domain/MessageHistory');
var MessageFactory = require('../domain/MessageFactory');

module.exports = {
  'init': function(appState) {

    var sendAction = appState.reference(['actions', 'send']);
    sendAction.observe('change', function() {

      if(sendAction.cursor().deref()) {
        var messageCursor = appState.cursor(['inputs', 'message']);
        var message = messageCursor.deref();

        messageCursor.update(() => '');
        sendAction.cursor().update(() => false);

        if(message === '') {
          return;
        }

        var userName = appState.cursor('currentUser').deref();
        var newMessage = MessageFactory.pending(userName, message);
        var pendingMessageCursor = appState.cursor(['history', 'pending']);

        pendingMessageCursor.
          update((history) => MessageHistory.add(history, newMessage));
      }
    });
  }
};
