import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICoordinates } from 'src/app/models/iCoordinates';
import { IWeatherConditions } from 'src/app/models/iWeather-conditions';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { WeatherConditionsService } from 'src/app/services/weather-conditions.service';

@Component({
  selector: 'app-weather-conditions',
  templateUrl: './weather-conditions.component.html',
  styleUrls: ['./weather-conditions.component.css']
})
export class WeatherconditionsComponent implements OnInit {

  public temperature: string = "";
  public description: string = "";
  public cityState: string = "";
  public zipcode: string = "";
  public coordinates: string = "";
  public currentConditions: IWeatherConditions = { temperature: "", description: "" };

  constructor(
      private weatherconditionsService: WeatherConditionsService
    , private geocodingService: GeocodingService) { 
      this.currentConditions = null as unknown as IWeatherConditions;
  }

  ngOnInit(): void {
  }

  public getForecatsByCityState() {
    const locationArray = this.cityState.split(',');
    const city = locationArray[0];
    const state = locationArray[1].trim();
    this.geocodingService.getLatLongFromCityState(city, state).subscribe(coordinates => {
      this.weatherconditionsService.getconditionsForCoordinates(coordinates).subscribe(result => {
        this.currentConditions = result;
      })
    });
  }

  public getForecatsByZipcode() {
    this.geocodingService.getLatLongFromZipcode(this.zipcode).subscribe(coordinates => {
      this.weatherconditionsService.getconditionsForCoordinates(coordinates).subscribe(result => {
        this.currentConditions = result;
      })
    });
  }

  public getForecatsByCoordinates() {
    const coordinateArray = this.coordinates.split(',');
    const coordinates: ICoordinates = {
      latitude: coordinateArray[0],
      longitude: coordinateArray[1].trim()
    }

    this.weatherconditionsService.getconditionsForCoordinates(coordinates).subscribe(result => {
      this.currentConditions = result;
    });
  }

  public cityStateOnFocus() {
    this.zipcode = "";
    this.coordinates = "";
    this.currentConditions = null as unknown as IWeatherConditions;
  }

  public zipcodeOnFocus() {
    this.cityState = "";
    this.coordinates = "";
    this.currentConditions = null as unknown as IWeatherConditions;
  }

  public coordinatesOnFocus() {
    this.cityState = "";
    this.zipcode = "";
    this.currentConditions = null as unknown as IWeatherConditions;
  }
}
