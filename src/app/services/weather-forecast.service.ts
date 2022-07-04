import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IWeatherForecast } from '../models/iWeather-forecast';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  public getForecastForCityState(city: string, state: string): Observable<IWeatherForecast> {
    let apiUrl = `${this.apiService.getLatLongFromCityStateApi(city, state)}`;

    return this.http.get<IWeatherForecast>(`${apiUrl}`).pipe(
      map(result => {
        return result; 
      })
    );
  }
}
