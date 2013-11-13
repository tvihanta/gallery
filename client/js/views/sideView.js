define([
  'views/base/collection-view',
  'views/galleryListView',
  'text!templates/sideBar.hbs',
    'models/galleries'
], function(View, itemView, template, Galleries) {
  'use strict';

  var Sidebar = View.extend({
    // Automatically render after initialize
    autoRender: true,
    className: 'row',
    template: template,
    itemView: itemView,
    listSelector: "#galleryList",
    initialize:function (options) {
        this.collection = new Galleries();
        this.collection.fetch();
        Sidebar.__super__.initialize.apply(this, arguments);
        this.delegate("click", ".menu-item",  this.setSelectedItem);
    },
    setSelectedItem:function (e) {
      this.$('.menu-item').removeClass("active");
      $(e.currentTarget).addClass("active");
    }
   
  });

  return Sidebar;
});
