'use strict';

require('../css/app.scss');

var state = require('./AppState');
var storage = require('./Storage');

require('./StateSyncer').init(state, storage);
require('./handlers/ChatLoginHandler').init(state);
require('./handlers/ChatLogoutHandler').init(state);
require('./handlers/ChatInputHandler').init(state);

let socket = new Phoenix.Socket("/ws");
socket.connect();
let channel = socket.chan("chat", {})

require('./MessageReceiver').init(state, channel);
require('./MessageBroadcaster').init(state, channel);

var React = require('react');
var ChatApp = require('./components/ChatApp');

var render = function() {
  React.render(<ChatApp appState={state.cursor()}/>,
               document.getElementById('awesome-chat'));
};

state.on('swap', () => render() );

render();
