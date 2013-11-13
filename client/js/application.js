define(['chaplin'], function(Chaplin) {
  'use strict';

  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: 'Chaplin Example Application',
    initRouter:function (routes, options) {
      options.pushState = false;
      Chaplin.Application.prototype.initRouter.apply(this, arguments);
    },
    start: function() {
      // You can fetch some data here and start app
      // (by calling supermethod) after that.
      Chaplin.Application.prototype.start.apply(this, arguments);
    }
  });

  return Application;
});
