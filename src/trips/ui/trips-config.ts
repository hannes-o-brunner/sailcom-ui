
config.$inject = ["$httpProvider", "$routeProvider"];

export function config($httpProvider: ng.IHttpProvider, $routeProvider: ng.route.IRouteProvider): void {

  $routeProvider
    .when("/trips", {
      template: "<trips-page></trips-page>"
    });

}
