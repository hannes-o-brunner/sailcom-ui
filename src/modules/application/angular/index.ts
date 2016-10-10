
import "angular";

import { StarComponent } from "./components/star/StarComponent";
import { AppFrame } from "./components/app/AppFrame";

angular
  .module("app.application", [])
  .component("appFrame", new AppFrame())
  .component("star", new StarComponent());
