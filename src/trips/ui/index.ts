
import "angular";
import "angular-route";

import { config } from "./trips-config";
import { TripsPage } from "./trips-page";

angular
  .module("trips-ui", ["ngRoute"])
  .component("tripsPage", new TripsPage())
  .config(config);
