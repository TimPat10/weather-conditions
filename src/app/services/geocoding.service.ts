import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ICoordinates } from '../models/iCoordinates';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor() { }

  private _tippCityCoordinates: ICoordinates = {
    latitude: "39.88963102486146",
    longitude: "-84.10662579008196"    
  }

  private _stLouisCoordinates: ICoordinates = {
    latitude: "38.625490353618716",
    longitude: "-90.18678253546466"
  }

  public getLatLongFromCityState(city: string, state: string): Observable<ICoordinates> {
    let coordinates: ICoordinates;

    if (city.toLocaleLowerCase() == "tipp city" && state.toLocaleLowerCase() == "oh") {
      return of(this._tippCityCoordinates);
    }

    if (city.toLocaleLowerCase() == "st. louis" && state.toLocaleLowerCase() == "mo") {
      return of(this._stLouisCoordinates);
    }

    // Bad request
    return of({
      latitude: "XXXXX",
      longitude: "YYYYY"
    });
  }

  public getLatLongFromZipcode(zipcode: string): Observable<ICoordinates> {
    if (zipcode == "45371") {
      return of(this._tippCityCoordinates);
    }

    if (zipcode == "63101") {
      return of(this._stLouisCoordinates);
    }
    
    // Bad request
    return of({
      latitude: "XXXXX",
      longitude: "YYYYY"
    });
  }
}
