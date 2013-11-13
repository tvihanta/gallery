define([
  'models/base/model',
], function(Model) {
  'use strict';

  var Galleries = Model.extend({
  	url: function () {
      return this.baseUrl + "galleries/";
    },
    defaults:{
      baseUrl: function(){ return this.baseUrl}
    }
    
  });

  return Galleries;
});