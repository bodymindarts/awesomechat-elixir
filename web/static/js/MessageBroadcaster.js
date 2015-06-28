'use strict';

module.exports = {
  'init': function(appState, channel) {

    var pendingMessages = appState.reference(['history', 'pending']);

    channel.join().receive("ok", chan=> {
      pendingMessages.cursor().deref().
        forEach((message) => chan.push({ body: message }));
    });

    pendingMessages.observe('change', function() {
      pendingMessages.cursor().deref().
        forEach((message) => channel.push('new_msg', { body: message }));
    });
  }
};
