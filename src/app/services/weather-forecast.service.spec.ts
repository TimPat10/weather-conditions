import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ICoordinates } from '../models/iCoordinates';
import { IWeatherForecast } from '../models/iWeather-forecast';
import { ApiService } from './api.service';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedForecast: IWeatherForecast;

  const api: string = "https://someCoordinate/api";
  const coordinates: ICoordinates = {
    latitude: "39.88963102486146",
    longitude: "-84.10662579008196"
  };

  const expectedForecast: IWeatherForecast = { temperature: "78", description: "Sunny" };
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getForecastByCoordinatesApi']);

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
    apiServiceSpy.getForecastByCoordinatesApi.and.returnValue(api);
    service = TestBed.inject(WeatherForecastService);
  });
 
  beforeEach(() => {
    service.getForecastForCoordinates(coordinates)
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

  it(`should return forecast of ${expectedForecast.temperature} degrees and ${expectedForecast.description} for latitude ${coordinates.latitude}, longitude ${coordinates.longitude}`, () => {
    req.flush(expectedForecast);
    expect(returnedForecast).toEqual(expectedForecast);  
  });
});
