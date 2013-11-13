define([
  'views/base/view',
  'text!templates/galleryListItem.hbs'
], function(View, template) {
  'use strict';

  var itemView = View.extend({
    // Automatically render after initialize
    autoRender: true,
    tagName: "li",
    className: "menu-item",
    // Save the template string in a prototype property.
    // This is overwritten with the compiled template function.
    // In the end you might want to used precompiled templates.
    template: template,
    attach:function(){
      itemView.__super__.attach.apply(this, arguments);
     // this.setSelectedItem();
    },
     setSelectedItem:function () {
      this.$el.removeClass("active");
      var gallery = window.location.hash.split("/")[1];
      if(this.model.get("name") == gallery){
        this.$el.addClass("active");
      }
    }
  });

  return itemView;
});
