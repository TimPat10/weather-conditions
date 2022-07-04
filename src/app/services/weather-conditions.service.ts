import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ICoordinates } from '../models/iCoordinates';
import { IWeatherCopnditions } from '../models/iWeather-conditions';
import { ApiService } from './api.service';
import { GeocodingService } from './geocoding.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherConditionsService {

  constructor(private http: HttpClient , private apiService: ApiService) { }

  public getconditionsForCoordinates(coordinates: ICoordinates): Observable<IWeatherCopnditions> {
    let apiUrl = `${this.apiService.getconditionsByCoordinatesApi(coordinates)}`;

    return this.http.get<IWeatherCopnditions>(`${apiUrl}`).pipe(
      map(result => {
        const raw = <any> result;
        const weather: IWeatherCopnditions = {
          temperature: ((raw.main.temp - 273.15) / (5/9) + 32).toString(),
          description: raw.weather[0].description
        };
        return weather; 
      })
    );
  }
}
