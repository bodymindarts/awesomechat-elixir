'use strict';

var ImmutableOptimization = require('../mixins/ImmutableOptimization');
var React = require('react');
var ChatScreen = require('./ChatScreen');
var ChatLogin = require('./ChatLogin');
var ChatLogout = require('./ChatLogout');
var ChatInput = require('./ChatInput');
var MessageHistory = require('../domain/MessageHistory');

module.exports = React.createClass({
  mixins: [ImmutableOptimization],

  render: function(){

    var inputs = this.props.appState.cursor('inputs');
    var actions = this.props.appState.cursor('actions');
    var loggedIn = this.props.appState.cursor('loggedIn').deref();
    var currentUser = this.props.appState.cursor('currentUser').deref();

    var confirmed = this.props.appState.
      cursor(['history', 'confirmed']).deref();
    var pending = this.props.appState.cursor(['history', 'pending']).deref();
    var chatHistory = MessageHistory.merge(confirmed, pending);

    if(!loggedIn) {
      return (
        <div className='chat-app'>
          <h1>Welcome to AwesomeChat</h1>
          <ChatLogin
            action={actions.cursor('login')}
            input={inputs.cursor('name')} />
          <ChatScreen
            history={chatHistory}
            currentUser={currentUser}
          />
          <ChatInput
            action={actions.cursor('send')}
            input={inputs.cursor('message')}
            disabled={!loggedIn}
          />
        </div>
      );
    } else {
      return (
        <div className='chat-app'>
          <h1>Welcome to AwesomeChat</h1>
          <div className='welcome' >
            <ChatLogout action={actions.cursor('logout')} />
            Welcome, <span className='user' >{currentUser}</span>!
          </div>
          <ChatScreen
            history={chatHistory}
            currentUser={currentUser}
          />
          <ChatInput
            action={actions.cursor('send')}
            input={inputs.cursor('message')}
            disabled={!loggedIn}
          />
        </div>
      );
    }
  }
});
