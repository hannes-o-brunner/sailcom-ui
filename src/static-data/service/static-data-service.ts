
import * as _ from "lodash";

import { SessionService } from "../../session/service";

export interface Lake {

  id: number;
  name: string;

  getHarbors(): Harbor[];
  getShips(): Ship[];

}

export interface Harbor {

  id: number;
  name: string;
  lakeId: number;

  getLake(): Lake;
  getShips(): Ship[];

}

export interface Ship {

  id: number;
  name: string;
  lakeId: number;
  harborId: number;
  hasImg: boolean;
  plate: string;
  type: string;
  location: string;
  pax: number;
  sailSize: string;
  length: string;

  getLake(): Lake;
  getHarbor(): Harbor;

}

class LakeImpl implements Lake {

  public id: number;
  public name: string;

  private harbors: Harbor[] = [];
  private ships: Ship[] = [];

  constructor(
    lake: Lake
  ) {
    _.assign(this, lake);
  }

  getHarbors(): Harbor[] {
    return this.harbors;
  }

  addHarbor(harbor: Harbor): void {
    this.harbors.push(harbor);
  }

  getShips(): Ship[] {
    return this.ships;
  }

  addShip(ship: Ship): void {
    this.ships.push(ship);
  }

}

class HarborImpl implements Harbor {

  public id: number;
  public name: string;
  public lakeId: number;

  private lake: Lake = null;
  private ships: Ship[] = [];

  constructor(
    harbor: Harbor
  ) {
    _.assign(this, harbor);
  }

  getLake(): Lake {
    return this.lake;
  }

  setLake(lake: Lake): void {
    this.lake = lake;
  }

  getShips(): Ship[] {
    return this.ships;
  }

  addShip(ship: Ship): void {
    this.ships.push(ship);
  }

}

class ShipImpl implements Ship {

  public id: number;
  public name: string;
  public lakeId: number;
  public harborId: number;
  public hasImg: boolean;
  public plate: string;
  public type: string;
  public location: string;
  public pax: number;
  public sailSize: string;
  public length: string;

  private harbor: Harbor = null;

  constructor(
    ship: Ship
  ) {
    _.assign(this, ship);
  }

  getLake(): Lake {
    return this.harbor.getLake();
  }

  getHarbor(): Harbor {
    return this.harbor;
  }

  setHarbor(harbor: Harbor): void {
    this.harbor = harbor;
  }

}

export class StaticDataService {

  public static $inject: Array<string> = ["$log", "$http", "$q"];

  private lakes: LakeImpl[];
  private lakesById: { [id: number]: LakeImpl } = {};

  private harbors: HarborImpl[];
  private harborsById: { [id: number]: HarborImpl } = {};

  private ships: ShipImpl[];
  private shipsById: { [id: number]: ShipImpl } = {};

  constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private $q: ng.IQService) {
  }

  public getLakes(): Lake[] {
    return this.lakes;
  };

  public getLake(lakeId): Lake {
    return this.lakesById[lakeId];
  };

  public getHarbors(): Harbor[] {
    return this.harbors;
  };

  public getHarbor(harborId): Harbor {
    return this.harborsById[harborId];
  };

  public getShips(): Ship[] {
    return this.ships;
  };

  public getShip(shipId): Ship {
    return this.shipsById[shipId];
  };

  public init = function () {

    if (this.lakes) {
      return;
    }

    var self: StaticDataService = this;

    return this.$q.all([
      this.$http
        .get(SessionService.API_BASE_URL + "/lakes")
        .success((data: Lake[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
          self.lakes = data.map(function (lake: Lake): LakeImpl { return new LakeImpl(lake); });
          self.lakesById = {};
        }),
      this.$http
        .get(SessionService.API_BASE_URL + "/harbors")
        .success((data: Harbor[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
          self.harbors = data.map(function (harbor: Harbor): HarborImpl { return new HarborImpl(harbor); });
          self.harborsById = {};
        }),
      this.$http
        .get(SessionService.API_BASE_URL + "/ships")
        .success((data: Ship[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
          self.ships = data.map(function (ship: Ship): ShipImpl { return new ShipImpl(ship); });
          self.shipsById = {};
        })
    ])
      .then(function () {

        self.lakes.forEach(function (lake) {
          self.lakesById[lake.id] = lake;
        })

        self.harbors.forEach(function (harbor) {
          self.harborsById[harbor.id] = harbor;
          let lake = self.lakesById[harbor.lakeId];
          harbor.setLake(lake);
          lake.addHarbor(harbor);
        })

        self.ships.forEach(function (ship) {
          self.shipsById[ship.id] = ship;
          let harbor = self.harborsById[ship.harborId];
          ship.setHarbor(harbor);
          harbor.addShip(ship);
          let lake = self.lakesById[ship.lakeId];
          lake.addShip(ship);
        })

        self.$log.info("StaticDataService: " + self.lakes.length + " lakes, " + self.harbors.length + " harbors, " + self.ships.length + " ships");
      });
  };

}
/*
ships.service("ShipListService", ["ShipService", function (ShipService) {

  this.itemList = {};

  this.getItemList = function (lakeId) {
    if (!this.itemList[lakeId]) {
      //item = { kind: "lake", lake: Lake };
      //item = { kind: "lake", ship: Ship };
      var item = null;
      var itemList = [];
      var harborList = ShipService.getHarborsForLake(lakeId), h;
      var shipList, s;
      for (h = 0; h < harborList.length; h++) {
        item = { kind: "harbor", harbor: harborList[h] };
        itemList.push(item);
        shipList = ShipService.getShipsForHarbor(harborList[h].id);
        for (s = 0; s < shipList.length; s++) {
          item = { kind: "ship", ship: shipList[s] };
          itemList.push(item);
        }
      }
      this.itemList[lakeId] = itemList;
    }
    return this.itemList[lakeId];
  };

  return this;

}]);
*/

/*
ships.constant("SHIP_SEL", {
  mine: "ship-sel-mine",
  lake: "ship-sel-lake",
  harbor: "ship-sel-harbor",
  ship: "ship-sel-ship"
});
*/

/*
ships.service("ShipSelService", ["ShipService", "SHIP_SEL", function (ShipService, SHIP_SEL) {

  // Ship Selection
  this.shipSel = null;  // SHIP_SEL (mine, lake, harbor, ship)
  this.selId = null;

  this.setShipSel = function (shipSel, selId) {
    this.shipSel = shipSel;
    if (shipSel === SHIP_SEL.mine) {
      this.selId = null;
    } else if (shipSel === SHIP_SEL.lake) {
      this.selId = selId;
    } else if (shipSel === SHIP_SEL.harbor) {
      this.selId = selId;
    } else if (shipSel === SHIP_SEL.ship) {
      this.selId = selId;
    } else {
      this.shipSel = null;
      this.selId = null;
    }
  };

  this.getShipSel = function () {
    return this.shipSel;
  };

  this.getSelId = function () {
    return this.selId;
  };

  this.isSel = function (shipSel, selId) {
    if (this.shipSel === shipSel && this.selId === selId) {
      return true;
    }
    if (this.shipSel === SHIP_SEL.mine) {
      if (shipSel === SHIP_SEL.mine) {
        return true;
      }
      if (shipSel === SHIP_SEL.ship) {
        return ShipService.getShip(selId).isAvailable;
      }
    }
    if (shipSel === SHIP_SEL.ship) {
      if (this.shipSel === SHIP_SEL.lake) {
        return ShipService.getShip(selId).lakeId === this.selId;
      }
      if (this.shipSel === SHIP_SEL.harbor) {
        return ShipService.getShip(selId).harborId === this.selId;
      }
    }
    if (shipSel === SHIP_SEL.harbor) {
      if (this.shipSel === SHIP_SEL.lake) {
        return ShipService.getHarbor(selId).lakeId === this.selId;
      }
    }
    return false;
  };

  this.hasSel = function (shipSel, selId) {
    var shipList, i, ship;
    if (shipSel === SHIP_SEL.mine) {
      shipList = ShipService.getMyShips();
    }
    if (shipSel === SHIP_SEL.lake) {
      shipList = ShipService.getShipsForLake(selId);
    }
    if (shipSel === SHIP_SEL.harbor) {
      shipList = ShipService.getShipsForHarbor(selId);
    }
    if (shipSel === SHIP_SEL.ship) {
      return false;
    }
    for (i = 0; i < shipList.length; i++) {
      ship = shipList[i];
      if (this.isSel(SHIP_SEL.ship, ship.id)) {
        return true;
      }
    }
    return false;
  };

  return this;

}]);
*/
