define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var Collection = Chaplin.Collection.extend({
    model: Model,
    baseUrl : 'http://192.168.11.8:30085/'
    // Place your application-specific collection features here
  });

  return Collection;
});
