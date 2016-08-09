/*eslint-disable strict */
(function () {

  var React = require('react');
  var Header = require('./common/header.js');
  var RouteHandler = require('react-router').RouteHandler;
  $ = jQuery = require('jquery');

  //proper routing mechanism using react-router
  var App = React.createClass({
    render: function () {
      return (
        <div>
          <Header />
          <div className="container-fluid">
            <RouteHandler />
          </div>
        </div>
      );

    }
  });


  //simple routing mechanism to check the 'route' prop of the component
  /*var App = React.createClass({
    render: function () {
      var Child;
      switch (this.props.route) {
        case 'about':
          Child = About;
        break;
        case 'author':
          Child = AuthorPage;
        break;
        default:
          Child = Home;
      }

      return (
        <div>
          <Header />
          <Child />
        </div>
      );

    }
  });*/

  module.exports = App;


})();
