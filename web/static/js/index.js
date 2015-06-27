'use strict';

require('./assets/stylesheets/styles.scss');

var state = require('./AppState');
var storage = require('./Storage');

require('./StateSyncer').init(state, storage);
require('./handlers/ChatLoginHandler').init(state);
require('./handlers/ChatLogoutHandler').init(state);
require('./handlers/ChatInputHandler').init(state);

var ReconnectingWebSocket = require('ReconnectingWebSocket');
var socket = new ReconnectingWebSocket(
  'ws://localhost:10000', null, { reconnectInterval: 500, reconnectDecay: 1.1 }
);

require('./MessageReceiver').init(state, socket);
require('./MessageBroadcaster').init(state, socket);

var React = require('react');
var ChatApp = require('./components/ChatApp');

var render = function() {
  React.render(<ChatApp appState={state.cursor()}/>,
               document.getElementById('content'));
};

state.on('swap', function() {
  render();
});

render();
