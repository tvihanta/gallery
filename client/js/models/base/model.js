define([
  'chaplin'
], function(Chaplin) {
  'use strict';

  var Model = Chaplin.Model.extend({
  	baseUrl : 'http://192.168.11.8:30085/'
    // Place your application-specific model features here
  });

  return Model;
});
