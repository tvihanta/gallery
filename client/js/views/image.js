define([
  'views/base/view',
  'text!templates/image.hbs'
], function(View, template) {
  'use strict';

  var HelloWorldView = View.extend({
    // Automatically render after initialize
    autoRender: true,
    className: "image",
    template: template
  });

  return HelloWorldView;
});
