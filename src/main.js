//handled in route file
/*var Home = require('./components/homePage.js');
var About = require('./components/about/aboutPage.js');
var AuthorPage = require('./components/authors/authorPage.js');*/

(function (doc) {
  'use strict';

  var React = require('react');
  var Router = require('react-router');
  var routes = require('./routes');
  var InitializeActions = require('./actions/InitializeActions');

  //call the initialize action to populate the authors list etc
  InitializeActions.initApp();

  /*now handled by react-router*/
  /*function render () {
    var route = win.location.hash.substr(1);
    React.render(<App route={route} />, document.getElementById('app'));

  }*/

  Router.run(routes, function (Handler) {
    React.render(<Handler />, doc.getElementById('app'));
  });

  /*win.addEventListener('haschange', render);
  render();*/

})(document);
