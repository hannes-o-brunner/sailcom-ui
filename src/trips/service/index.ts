
export * from "./trips-service";

import "angular";

import { TripsService } from "./trips-service";

angular
  .module("trips", [])
  .service("TripsService", TripsService);
