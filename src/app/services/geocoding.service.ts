import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICoordinates } from '../models/iCoordinates';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor() { }

  public getLatLongFromCityState(city: string, state: string): Observable<ICoordinates> {
    let coordinates: ICoordinates;

    if (city.toLocaleLowerCase() == "tipp city" && state.toLocaleLowerCase() == "oh") {
      coordinates = {
        latitude: "39.88963102486146",
        longitude: "-84.10662579008196"
      }
      return of(coordinates);
    }

    if (city.toLocaleLowerCase() == "st. louis" && state.toLocaleLowerCase() == "mo") {
      coordinates = {
        latitude: "38.625490353618716",
        longitude: "-90.18678253546466"
      }
      return of(coordinates);
    }

    return of({
      latitude: "XXXXX",
      longitude: "YYYYY"
    });
  }

  public getLatLongFromZipcode(zipcode: string): Observable<ICoordinates> {
    return of(
      {
        latitude: "39.88963102486146",
        longitude: "-84.10662579008196"
      });
  }
}
