import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IWeatherForecast } from 'src/app/models/iWeather-forecast';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  public temperature: string = "";
  public description: string = "";
  public cityState: string = "";
  public zipcode: string = "";
  public latitude: string = "";
  public longitude: string = "";
  public forecast: IWeatherForecast = { temperature: "", description: "" };

  constructor(
      private weatherForecastService: WeatherForecastService
    , private geocodingService: GeocodingService) { 
    this.forecast = { temperature: "60", description: "Nice!" };
  }

  ngOnInit(): void {
    this.forecast = { temperature: "60", description: "Nice!" };
  }

  public getForecatsByCityState() {
    const locationArray = this.cityState.split(',');
    const city = locationArray[0];
    const state = locationArray[1].trim();
    this.geocodingService.getLatLongFromCityState(city, state).subscribe(coordinates => {
      this.weatherForecastService.getForecastForCoordinates(coordinates).subscribe(result => {
        this.forecast = result;
      })
    });
  }
}
