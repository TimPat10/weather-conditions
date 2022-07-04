import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ICoordinates } from '../models/iCoordinates';
import { IWeatherForecast } from '../models/iWeather-forecast';
import { ApiService } from './api.service';
import { GeocodingService } from './geocoding.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient , private apiService: ApiService) { }

  public getForecastForCoordinates(coordinates: ICoordinates): Observable<IWeatherForecast> {
    let apiUrl = `${this.apiService.getForecastByCoordinatesApi(coordinates)}`;

    return this.http.get<IWeatherForecast>(`${apiUrl}`).pipe(
      map(result => {
        return result; 
      })
    );
  }
}
