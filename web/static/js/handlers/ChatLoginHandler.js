'use strict';

module.exports = {
  'init': function(appState) {

    var loginAction = appState.reference(['actions', 'login']);
    loginAction.observe('change', function() {

      if(loginAction.cursor().deref()) {
        var nameCursor = appState.cursor(['inputs', 'name']);
        var name = nameCursor.deref();

        nameCursor.update(() => '');
        loginAction.cursor().update(() => false );

        if(name === '') {
          return;
        }

        appState.cursor('currentUser').update(() => name);
        appState.cursor('loggedIn').update(() => true);
      }
    });
  }
};
