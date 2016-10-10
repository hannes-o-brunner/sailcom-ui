
import { SessionService } from "../service";
import { StaticDataService } from "../../static-data/service";
import { UserService } from "../../user/service";
import { TripsService } from "../../trips/service";

export class SessionPage implements ng.IComponentOptions {

  public controller: Function = SessionPageController;

  public template: string = require("./session-page.html");

}

export class SessionPageController {

  public static $inject: Array<string> = ["$location", "SessionService", "StaticDataService", "UserService", "TripsService"];

  constructor(private $location: ng.ILocationService, public sessionService: SessionService, private staticDataService: StaticDataService, private userService: UserService, private tripsService: TripsService) {
  }

  public login(userId: string, pwd: string) {
    let self: SessionPageController = this;
    this.sessionService
    .login(userId, pwd)
    .then(function() {
      return self.staticDataService.init();
    })
    .then(function() {
      return self.userService.init();
    })
    .then(function() {
      return self.tripsService.init();
    })
    .then(function() {
      self.$location.path("/trips");
    });
  }

  public logout() {
    let self = this;
    this.sessionService
    .logout();
  }

}
