
export * from "./user-service";

import "angular";

import { UserService } from "./user-service";

angular
  .module("user", [])
  .service("UserService", UserService);
