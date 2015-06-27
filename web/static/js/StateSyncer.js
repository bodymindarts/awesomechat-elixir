'use strict';

var Immutable = require('immutable');

var initialize = function(state, storage) {

  var user = storage.readLoggedInUser();
  var history = storage.readHistory();

  if(history !== null) {
    state.cursor(['history', 'pending']).
      update(() => new Immutable.List(history.pending));
    state.cursor(['history', 'confirmed']).
      update(() => new Immutable.List(history.confirmed));
  }

  if(user !== null) {
    state.cursor('currentUser').update(() => user);
    state.cursor('loggedIn').update(() => true);
  }
};

module.exports = {
  'init': function(state, storage) {

    initialize(state, storage);

    var currentUser = state.reference('currentUser');
    currentUser.observe('change', function() {

      var name = currentUser.cursor().deref();
      if(name !== '') {
        storage.writeLoggedInUser(name);
      } else {
        storage.removeLoggedInUser();
      }
    });

    var history = state.reference('history');
    history.observe('change', function() {
      storage.writeHistory(history.cursor().deref());
    });
  }
};
