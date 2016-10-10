
import "angular";
import "angular-animate/angular-animate.min.js";
import "angular-aria/angular-aria.min.js";
import "angular-material/angular-material.min.js";
import "angular-material-icons/angular-material-icons.min.js";

import "./app/ui";

import "./session/service";
import "./session/ui";

import "./user/service";

import "./static-data/service";

import "./trips/service";
import "./trips/ui";



//import "./modules/application/angular/index";
//import "./modules/tweets/angular/index";
//import "./modules/about/angular/index";

// load our default (non specific) css
import "angular-material/angular-material.min.css";
//import "font-awesome/css/font-awesome.css";
import "./styles/screen.scss";

import { HttpAuthInterceptor } from "./session/service";

angular
  .module("sailcom", ["ngMaterial", "app", "session", "session-ui", "static-data", "user", "trips", "trips-ui"])
  .config(configApp)
  .run(runApp);


configApp.$inject = ["$mdThemingProvider"];

function configApp($mdThemingProvider: any) {
/*
  var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
*/
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
}


runApp.$inject = ["$rootScope", "$location", "$log"];

function runApp($rootScope: ng.IRootScopeService, $location: ng.ILocationService, $log: ng.ILogService) {
  $rootScope.$on(HttpAuthInterceptor.AUTH_EVT, function () {
    $log.info("Session authenticated");
    //    main.currentUser = UserService.getCurrentUser();
  });
  $rootScope.$on(HttpAuthInterceptor.NOT_AUTH_EVT, function () {
    $log.info("Session not authenticated");
    //    main.currentUser = UserService.setCurrentUser(null);
    $location.path("/login");
  });
}

angular.bootstrap(document, ["sailcom"], {
  strictDi: true
});
