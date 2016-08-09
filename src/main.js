//handled in route file
/*var Home = require('./components/homePage.js');
var About = require('./components/about/aboutPage.js');
var AuthorPage = require('./components/authors/authorPage.js');*/

(function (doc) {
  var React = require('react');
  var Router = require('react-router');
  var routes = require('./routes');


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
