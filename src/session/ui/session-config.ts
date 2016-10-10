
config.$inject = ["$httpProvider", "$routeProvider"];

export function config($httpProvider: ng.IHttpProvider, $routeProvider: ng.route.IRouteProvider): void {

  $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push("HttpAuthInterceptor");

  $routeProvider
    .when("/login", {
      template: "<session-page></session-page>"
    })
    .when("/session", {
      template: "<session-page></session-page>"
    })
    .otherwise({ redirectTo: "/trips" });

}
