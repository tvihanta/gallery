define([
  'views/base/view',
  'text!templates/fullImageView.hbs'
], function(View, template) {
  'use strict';

  var ImageView = View.extend({
    // Automatically render after initialize
    autoRender: true,
    className: "large-image",
    container: ".modal-dialog",
    containerMethod: "html",
    template: template,
    initialize:function (options) {
      ImageView.__super__.initialize.apply(this, arguments);

      $(document).unbind('keydown');
      this.listenTo(this.model, "change", this.render);
      _.bindAll(this, 'onKey', "setNext", "setPrev");
      $(document).bind('keydown', this.onKey);
      this.delegate("click", "#image-next", function (e) {
          this.setNext();
      });
      this.delegate("click", "#image-prev", function (e) {
          this.setPrev();
      });
    },
    onKey:function  (e) {
      console.log(e);
      // left = 37
      // up = 38

      if(e.keyCode == 37){
        this.setPrev();
        e.preventDefault();
        e.stopImmediatePropagation();
      } else if(e.keyCode == 39){
        this.setNext();
        e.preventDefault();
        e.stopImmediatePropagation();  
      } else {
        return;
      }

    },
    setNext:function  () {
      var index = this.collection.indexOf(this.model);
      var newIndex = index +1;
      if(newIndex > this.collection.length - 1 ){
        newIndex = 0;
      }
      this.model = this.collection.at(newIndex);
      this.render();
    },

     setPrev:function  () {
      var index = this.collection.indexOf(this.model);
      var newIndex = index - 1;
      if(newIndex < 0){
        newIndex = this.collection.length - 1;
      }
      this.model = this.collection.at(newIndex);
      this.render();
    }
  });

  return ImageView;
});
