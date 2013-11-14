define([
  'views/base/collection-view',
  'views/image',
  'text!templates/galleryView.hbs',
  'isotope'
], function(View, ImageView,template, isotope) {
  'use strict';

  var Gallery = View.extend({
    // Automatically render after initialize
    autoRender: true,
    itemView: ImageView,
    listSelector: "#images",
    className: 'row',
    template: template,
    loadingSelector: "#gallery-loader",
     initialize:function (options) {
        Gallery.__super__.initialize.apply(this, arguments);
        this.listenTo(this.collection, 'reset', function (coll, res, opts) {
          var $cont = this.$('#images');
          var self = this;
          $cont.imagesLoaded( function(){
                $(self.loadingSelector).hide();
                $cont.isotope({
                  // options
                  itemSelector : '.image',
                  layoutMode : 'masonry',
                  masonry : {
                  }
                });

                $cont.isotope( 'reLayout',function () {
                  console.log("relayouted images");
                  });
          });

        });
    },
    attach:function(){
      Gallery.__super__.attach.apply(this, arguments);
    }
  });

  return Gallery;
});
  