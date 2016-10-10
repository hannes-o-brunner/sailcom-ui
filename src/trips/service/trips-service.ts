
import * as _ from "lodash";

import { SessionService } from "../../session/service";
import { StaticDataService } from "../../static-data/service";

export interface Trip {

  tripId: number;
  isMine: boolean;

  shipId: number;
  harborId: number;
  lakeId: number;

  bookDate: string;
  bookTimeFrom: string;
  bookTimeTo: string;

  tripDateFrom: string;
  tripTimeFrom: string;
  tripDateTo: string;
  tripTimeTo: string;

  userName: string;
  userAdress: string;
  userPhone: string;
  userMobile: string;
  userMail: string;
  userComment: string;
  userHasImg: boolean;
  userImgUrl: string;

}

class TripImpl implements Trip {

  public tripId: number;
  public isMine: boolean;

  public shipId: number;
  public harborId: number;
  public lakeId: number;

  public shipName: string;
  public harborName: string;
  public lakeName: string;

  public dateFrom: Date;
  public dateTo: Date;

  public bookDate: string;
  public bookTimeFrom: string;
  public bookTimeTo: string;

  public tripDateFrom: string;
  public tripTimeFrom: string;
  public tripDateTo: string;
  public tripTimeTo: string;

  public userName: string;
  public userAdress: string;
  public userPhone: string;
  public userMobile: string;
  public userMail: string;
  public userComment: string;
  public userHasImg: boolean;
  public userImgUrl: string;

  constructor(
    trip: Trip
  ) {
    _.assign(this, trip);
  }

}  

export class TripsService {

  public static $inject: Array<string> = ["$log", "$http", "StaticDataService"];

  private trips: Array<TripImpl> = [];
  private tripsById: { [id: number ]: TripImpl } = {};

  constructor(private $log: ng.ILogService, private $http: ng.IHttpService, private staticDataService: StaticDataService) {
  }

  public getTrips = function () {
    return this.trips;
  };

  public getTrip(tripId) {
    return this.tripsById[tripId];
  };

  public init() {

    var self = this;

    return this.$http
//      .get(SessionService.API_BASE_URL + "/trips")
      .get(SessionService.API_BASE_URL + "/bookings?shipId=112&date=01.09.2014&nofWeeks=2")
      .success((data: any[], status: number, headers: (headerName: string) => string, config: ng.IRequestConfig): void => {
        self.trips = data.map(function (trip: Trip): TripImpl { return new TripImpl(trip); });
        self.trips.forEach(function(trip) {
          self.tripsById[trip.tripId] = trip;
          let ship = self.staticDataService.getShip(trip.shipId);
          trip.lakeName = ship.getLake().name;
          trip.harborName = ship.getHarbor().name;
          trip.shipName = ship.name;
//          trip.dateFrom = new Date(Date.parse(trip.dateFrom));
//          trip.dateTo = new Date(Date.parse(trip.dateTo));
        });
        self.$log.info("TripsService: " + self.trips.length + " trips");
      });

  };

}
