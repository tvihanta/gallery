define([
  'chaplin',
  'models/base/model'
], function(Chaplin, Model) {
  'use strict';

  var Collection = Chaplin.Collection.extend({
    model: Model,
    baseUrl : gallery.baseUrl
    // Place your application-specific collection features here
  });

  return Collection;
});
