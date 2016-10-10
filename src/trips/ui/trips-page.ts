
import { TripsService } from "../service";

export class TripsPage implements ng.IComponentOptions {

  public controller: Function = TripsPageController;

  public template: string = require("./trips-page.html");

}

export class TripsPageController {

  public static $inject: Array<string> = ["TripsService"];

  constructor(public tripsService: TripsService) {
  }

}
