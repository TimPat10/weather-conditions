import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IWeatherForecast } from '../models/iWeather-forecast';
import { ApiService } from './api.service';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedForecast: IWeatherForecast;

  const api: string = "https://someWeatherForecast/api";
  const city: string = "Tipp City";
  const state: string = "OH";
  const expectedForecast: IWeatherForecast = { prop1: "78", prop2: "Sunny" };
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getLatLongFromCityStateApi']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
      ],
      providers: [
         { provide: ApiService, useValue: apiServiceSpy },
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    apiServiceSpy.getLatLongFromCityStateApi.and.returnValue(api);
    service = TestBed.inject(WeatherForecastService);
  });
 
  beforeEach(() => {
    service.getForecastForCityState(city, state)
    .subscribe(
        result => {
          returnedForecast = result;
        }
    );

    req = httpTestingController.expectOne(api);
  });

  it(`should make one http.get request for weather forecast`, () => {
    expect(req.request.method).toEqual("GET");
  });

  it(`should return forecast of ${expectedForecast.prop1} degrees and ${expectedForecast.prop2} for ${city}, ${state}`, () => {
    req.flush(expectedForecast);
    expect(returnedForecast).toEqual(expectedForecast);  
  });

   

});
