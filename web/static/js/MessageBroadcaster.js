'use strict';

module.exports = {
  'init': function(appState, channel) {

    var pendingMessages = appState.reference(['history', 'pending']);

    channel.join().receive("ok", () => {
      channel.push('sync', {history: pendingMessages.cursor().deref()})
    });

    pendingMessages.observe('change', function() {
      pendingMessages.cursor().deref().
        forEach((message) => channel.push('new_msg', message));
    });
  }
};
