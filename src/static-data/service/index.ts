
export * from "./static-data-service";

import "angular";

import { StaticDataService } from "./static-data-service";

angular
  .module("static-data", [])
  .service("StaticDataService", StaticDataService);
