'use strict';

console.log("Hello from Webpack");

let React = require('react');

let App = React.createClass({
  render() {
    return(
      <div>
      Hello world!
      </div>
    );
  }
});

console.log("lasdjlaksfj");
React.render(<App />, document.getElementById('awesome-chat'));
