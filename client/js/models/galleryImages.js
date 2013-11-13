define([
  'models/base/collection',
  'models/image'

], function(Model, ImageModel) {
  'use strict';

  var Galleries = Model.extend({
  	url: function () {
      return this.baseUrl + "galleries/"+this.name+"/";
    },
    model:ImageModel,
    parse:function (res) {
      return res.images;
    }
  });

  return Galleries;
});