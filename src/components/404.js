'use strict';
var React = require('react');

var NotFound = React.createClass({
  render: function () {
    return (
      <div className="jumbotron">
        <h1>Whoops</h1>
        <p>Not found mo-fo</p>
      </div>

    );
  }
});

module.exports = NotFound;
