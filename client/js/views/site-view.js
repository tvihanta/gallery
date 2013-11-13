define(['views/base/view', 'text!templates/site.hbs'], function(View, template) {
  'use strict';

  var SiteView = View.extend({
    container: '#content',
    id: 'site-container',
    regions: {
      main: '#main-container',
      side: '#side-container'
    },
    template: template
  });

  return SiteView;
});
