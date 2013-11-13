define([
  'controllers/base/controller',
   'models/galleryImages',
  'views/galleryView'

], function(Controller, GalleryImages, galleryView) {
  'use strict';

  var HelloWorldController = Controller.extend({
    show: function(params) {
    },
    gallery: function(params) {
      console.log(params);
      this.publishEvent("menu:setselected", params.name);
      this.collection = new GalleryImages();
      this.collection.name =params.name;

      this.view = new galleryView({
          region: "main",
          collection: this.collection 
      });
      this.collection.fetch({reset:true});

    }
  });

  return HelloWorldController;
});
