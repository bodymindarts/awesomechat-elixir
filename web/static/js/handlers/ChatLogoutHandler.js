'use strict';

module.exports = {
  'init': function(appState) {

    var logoutAction = appState.reference(['actions', 'logout']);
    logoutAction.observe('change', function() {

      if(logoutAction.cursor().deref()) {

        logoutAction.cursor().update(() => false );

        appState.cursor('currentUser').update(() => '');
        appState.cursor('loggedIn').update(() => false);
      }
    });
  }
};
