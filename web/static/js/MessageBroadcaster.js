'use strict';

module.exports = {
  'init': function(appState, channel) {

    var pendingMessages = appState.reference(['history', 'pending']);

    channel.join().receive("ok", channel => {
      pendingMessages.cursor().deref().
        forEach((message) => channel.push({ body: message }));
    });

    pendingMessages.observe('change', function() {
      pendingMessages.cursor().deref().
        forEach((message) => channel.push('new_msg', { body: message }));
    });
  }
};
