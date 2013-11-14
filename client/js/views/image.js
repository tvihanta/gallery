define([
  'views/base/view',
  'views/fullImageView',
  'text!templates/image.hbs',
  'bootstrap'
], function(View, FullImageView, template, bootstrap) {
  'use strict';

  var ThumbImageView = View.extend({
    // Automatically render after initialize
    autoRender: true,
    className: "image",
    template: template,
    initialize:function (options) {
      ThumbImageView.__super__.initialize.apply(this, arguments);
      this.delegate("click", ".image-link", function (e) {
          e.preventDefault();
          var view = new FullImageView({model: this.model, collection:this.model.collection});
          $('#popup').modal({show: true, keyboard:true});
      });
    }
  });

  return ThumbImageView;
});
