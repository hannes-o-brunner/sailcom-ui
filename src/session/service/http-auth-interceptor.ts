
export class HttpAuthInterceptor {

  public static $inject: Array<string> = ["$rootScope"];

  public static AUTH_EVT: string = "session.authorised";
  public static NOT_AUTH_EVT: string = "session.not-authorised";

  constructor(private $rootScope: ng.IRootScopeService) {
  }

  public checkHttpResponse(response: any): any {
    if (response.status === 401) {
      this.$rootScope.$broadcast(HttpAuthInterceptor.NOT_AUTH_EVT);
    }
    return response;
  }

}
