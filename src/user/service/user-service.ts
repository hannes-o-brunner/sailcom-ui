
import { SessionService }from "../../session/service";
import { StaticDataService, Lake, Harbor, Ship } from "../../static-data/service";

export class UserInfo {
  constructor(
    public availableLakes: number[],
    public availableHarbors: number[],
    public availableShips: number[]
  ) {
  }
}

export type ShipRatingMap = { [shipId: number]: number };

export class UserPref {
  constructor(
    public favoriteShips: number[],
    public ratedShips: ShipRatingMap
  ) {
  }
}

export class UserService {

  public static $inject: Array<string> = ["$log", "$http", "$q", "StaticDataService"];

  private lakes: Lake[] = [];
  private lakesById: { [id: number]: Lake } = {};
  private harbors: Harbor[] = [];
  private harborsById: { [id: number]: Harbor } = {};
  private ships: Ship[] = [];
  private shipsById: { [id: number]: Ship } = {};
  private favoriteShipsById: { [id: number]: Ship } = {};

  private userInfo: UserInfo;
  private userPref: UserPref;

  constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private $q: ng.IQService, private staticDataService: StaticDataService) {
  }

  public getLakes(): Lake[] {
    return this.lakes;
  };

  public isAvailableLake(id: number): boolean {
    return !!this.lakesById[id];
  };

  public getHarbors(): Harbor[] {
    return this.harbors;
  };

  public isAvailableHarbor(id: number): boolean {
    return !!this.harborsById[id];
  };

  public getShips(): Ship[] {
    return this.ships;
  };

  public isAvailableShip(id: number): boolean {
    return !!this.shipsById[id];
  };

  public isFavoriteShip(id: number): boolean {
    return !!this.favoriteShipsById[id];
  };

  public init = function () {

    this.lakes = [];
    this.lakesById = {};
    this.harbors = [];
    this.harborsById = {};
    this.ships = [];
    this.shipsById = {};
    this.favoriteShipsById = {};
    this.userInfo = null;
    this.userPref = null;

    var self: UserService = this;

    return this.$q.all([
      this.$http
        .get(SessionService.API_BASE_URL + "/user/info")
        .success((data: UserInfo, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
          self.userInfo = data;
        }),
      this.$http
        .get(SessionService.API_BASE_URL + "/userPref")
        .success((data: UserPref, status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
          self.userPref = data;
        })
    ])
      .then(function () {

        self.userInfo.availableShips.forEach(function (shipId) {
          const ship = self.staticDataService.getShip(shipId);
          self.ships.push(ship);
          self.shipsById[ship.id] = ship;
        });

        self.userInfo.availableHarbors.forEach(function (harborId) {
          const harbor = self.staticDataService.getHarbor(harborId);
          self.harbors.push(harbor);
          self.harborsById[harbor.id] = harbor;
        });

        self.userInfo.availableLakes.forEach(function (lakeId) {
          const lake = self.staticDataService.getLake(lakeId);
          self.lakes.push(lake);
          self.lakesById[lake.id] = lake;
        });

        self.userPref.favoriteShips.forEach(function (shipId) {
          const ship = self.staticDataService.getShip(shipId);
          self.favoriteShipsById[ship.id] = ship;
        });

        self.$log.info("UserService: " + self.lakes.length + " lakes, " + self.harbors.length + " harbors, " + self.ships.length + " ships");
      });
  };

}
