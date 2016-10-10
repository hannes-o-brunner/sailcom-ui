
import "angular";
import "angular-route";

import { config } from "./session-config";
import { SessionPage } from "./session-page";

angular
  .module("session-ui", ["ngRoute"])
  .component("sessionPage", new SessionPage())
  .config(config);
