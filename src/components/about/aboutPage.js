'use strict';

var React = require('react');

var About = React.createClass({
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if (!confirm('sure you wanna read?')) {
        transition.about();
      } else {
        callback();
      }
    },
    willTransitionFrom: function (transition, component) {
      if (!confirm('sure you wanna leave?')) {
        transition.about();
      }
    }
  },
  render: function () {
    return (
      <div>
        <h1>About</h1>
        <p>This app uses following</p>
        <ul>
          <li>React</li>
          <li>React router</li>
          <li>Flux</li>
          <li>Node</li>
          <li>Gulp</li>
        </ul>
      </div>

    );
  }
});

module.exports = About;
