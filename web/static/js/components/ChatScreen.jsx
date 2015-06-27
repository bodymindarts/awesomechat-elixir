'use strict';

var ImmutableOptimization = require('../mixins/ImmutableOptimization');
var React = require('react');
var ChatMessage = require('./ChatMessage');

module.exports = React.createClass({
  mixins: [ImmutableOptimization],

  componentWillUpdate: function() {

    var node = this.getDOMNode();
    var scrollDif = node.scrollTop + node.offsetHeight;

    this.shouldScrollBottom = scrollDif === node.scrollHeight;
  },

  componentDidUpdate: function() {

    if (this.shouldScrollBottom) {
      var node = this.getDOMNode();

      node.scrollTop = node.scrollHeight;
    }
  },

  renderMessages: function() {

    var currentUser = this.props.currentUser;

    return this.props.history.map(function (message) {
      return (
        <ChatMessage message={message} currentUser={currentUser}/>
      );
    });
  },

  render: function() {

    return (
      <ul className='chat-screen'>
        { this.renderMessages() }
      </ul>
    );
  }
});
