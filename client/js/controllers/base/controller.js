define(['chaplin', 
	'views/site-view',
 	'views/sideView',
 
	], function(Chaplin, SiteView, SideView) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    // Place your application-specific controller features here.
    beforeAction: function() {
      this.compose('site', SiteView);
  		this.compose('side', SideView, {region:"side"});
    }
  });

  return Controller;
});
