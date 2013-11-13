define([
  'models/base/collection',
], function(Model) {
  'use strict';

  var Galleries = Model.extend({
  	url: function () {
      return this.baseUrl + "galleries/";
    },
    parse:function (res) {
      return res.galleries;
    }
  });

  return Galleries;
});