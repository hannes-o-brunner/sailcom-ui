
import "angular";

import { AppFrame } from "./app-frame";

angular
  .module("app", [])
  .component("appFrame", new AppFrame());
