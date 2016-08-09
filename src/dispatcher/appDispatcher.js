(function () {
  'use strict';
  //singleton holding a list of callbacks
  var Dispatcher = require('flux').Dispatcher;
  module.exports = new Dispatcher();
})();
