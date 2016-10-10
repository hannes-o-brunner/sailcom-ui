
export * from "./session-service";
export * from "./http-auth-interceptor";

import "angular";

import { SessionService } from "./session-service";
import { HttpAuthInterceptor } from "./http-auth-interceptor";

angular
  .module("session", [])
  .service("SessionService", SessionService)
  .service("HttpAuthInterceptor", HttpAuthInterceptor);

