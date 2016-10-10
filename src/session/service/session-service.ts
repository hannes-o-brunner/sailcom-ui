
import { HttpAuthInterceptor } from "./http-auth-interceptor";

export class User {

  constructor(public id: string, public name: string, public role: string, public ip: string) {
  }

}

export class SessionInfo {

  constructor(public sessionId: string, public user: User) {
  }

}

export class SessionService {

  public static $inject: Array<string> = ["$log", "$http", "$rootScope"];

  public static API_BASE_URL = "http://localhost:8080/sailcom-proxy";

  public userId: string;
  public pwd: string;

  public sessionId: string;
  public user: User;

  constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private $rootScope: ng.IRootScopeService) {
  }

  private createSession(sessionId: string, user: User) {
    this.sessionId = sessionId;
    this.user = user;
  }

  private destroySession() {
    this.sessionId = null;
    this.user = null;
  }

  public login(userId: string, pwd: string): ng.IHttpPromise<{}> {
    let self = this;
    return this.$http
      .get(SessionService.API_BASE_URL + "/session/login?user=" + userId + "&pwd=" + pwd)
      .success((data: SessionInfo, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
        this.$log.info("Logged in");
        self.createSession(data.sessionId, data.user);
        self.$rootScope.$broadcast(HttpAuthInterceptor.AUTH_EVT);
      })
      .error((data: void, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
        self.destroySession();
      });
  };

  public isAuthenticated() {
    return !!this.sessionId;
  };

  public logout(): ng.IPromise<void> {
    let self = this;
    return this.$http
      .get(SessionService.API_BASE_URL + "/session/logout")
      .then(function (rsp) {
        self.$rootScope.$broadcast(HttpAuthInterceptor.NOT_AUTH_EVT);
        self.destroySession();
      }, function (rsp) {
        self.$rootScope.$broadcast(HttpAuthInterceptor.NOT_AUTH_EVT);
        self.destroySession();
      });
  };

}
