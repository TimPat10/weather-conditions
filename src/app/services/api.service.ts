import { Injectable } from '@angular/core';

//
// The API service is responsible for constructing the URLs that will connect to Web APIs
//
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor() { }

  //#region  APIs to get current weather conditions

  private _openWeatherMapBaseApi: string = "https://openweathermap.org/data/2.5/weather";
  private _openWeatherMapKey: string  = "cf002751564a4c78f5f7ed479f1b9ba3";

  public getWeatherForecastApi(latitude: string, longitude:string): string {
    const params = `lat=${latitude}&lon=${longitude}&apiid=${this._openWeatherMapKey}`;
    const api = `${this._openWeatherMapBaseApi}?${params}`.toLowerCase();
    return api;
  }

  //#endregion  APIs to get current weather conditions

  //#region APIs to get latitude and longitude

  private _someLatLongBaseApi = "https://someLatitudeLongitudeApi";
  private _someLatLongApiKey: string  = "someLatLongApiKey";

  public getLatLongFromCityStateApi(city: string, state: string) {
    const cityParam = encodeURIComponent(city.trim());
    const params = `city=${cityParam}&state=${state}&apiid=${this._someLatLongApiKey}`;

    const api = `${this._someLatLongBaseApi}?${params}`.toLowerCase();
    return api;
  }

  public getLatLongFromZipApi(zipcode: string) {
    const zipcodeParam = encodeURIComponent(zipcode.trim());
    const params = `zip=${zipcodeParam}&apiid=${this._someLatLongApiKey}`;

    const api = `${this._someLatLongBaseApi}?${params}`.toLowerCase();
    return api;
  }

  //#endregion APIs to get latitude and longitude
}
