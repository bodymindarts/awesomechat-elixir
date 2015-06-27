'use strict';

var ImmutableOptimization = require('../mixins/ImmutableOptimization');
var React = require('react');

module.exports = React.createClass({
  mixins: [ImmutableOptimization],

  handleLogout: function() {
    this.props.action.update(() => true);
  },

  render: function() {
    return (
      <button onClick={this.handleLogout} >Log Out</button>
    );
  }
});
