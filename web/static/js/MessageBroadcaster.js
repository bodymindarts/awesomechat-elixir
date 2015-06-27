'use strict';

module.exports = {
  'init': function(appState, socket) {

    var pendingMessages = appState.reference(['history', 'pending']);

    socket.onopen = function() {
      pendingMessages.cursor().deref().
        forEach((message) => socket.send(JSON.stringify(message)));
    };

    pendingMessages.observe('change', function() {
      if(socket.readyState === WebSocket.OPEN) {
        pendingMessages.cursor().deref().
          forEach((message) => socket.send(JSON.stringify(message)));
      }
    });
  }
};
