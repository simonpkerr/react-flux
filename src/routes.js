(function () {
  'use strict';
  var React = require('react');
  var Router = require('react-router');
  var DefaultRoute = Router.DefaultRoute;
  var Route = Router.Route;
  var NotFoundRoute = Router.NotFoundRoute;
  var Redirect = Router.Redirect;

  var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
      <DefaultRoute handler={require('./components/homePage.js')} />
      <Route name="authors" handler={require('./components/authors/authorPage.js')} />
      <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage.js')} />
      <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage.js')} />
      <Route name="about" handler={require('./components/about/aboutPage.js')} />
      <NotFoundRoute handler={require('./components/404.js')} />
      <Redirect from="about-us" to="about" />
      <Redirect from="awthurs" to="authors" />
      <Redirect from="about/*" to="about" />
    </Route>

  );

  module.exports = routes;


})();
