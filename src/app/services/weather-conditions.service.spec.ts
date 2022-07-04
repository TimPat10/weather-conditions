import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ICoordinates } from '../models/iCoordinates';
import { IWeatherCopnditions } from '../models/iWeather-conditions';
import { ApiService } from './api.service';

import { WeatherConditionsService } from './weather-conditions.service';

describe('WeatherconditionsService', () => {
  let service: WeatherConditionsService;

  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedconditions: IWeatherCopnditions;

  const api: string = "https://someCoordinate/api";
  const coordinates: ICoordinates = {
    latitude: "39.88963102486146",
    longitude: "-84.10662579008196"
  };

  const expectedconditions: IWeatherCopnditions = { temperature: "78", description: "Sunny" };
  const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getconditionsByCoordinatesApi']);

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
    apiServiceSpy.getconditionsByCoordinatesApi.and.returnValue(api);
    service = TestBed.inject(WeatherConditionsService);
  });
 
  beforeEach(() => {
    service.getconditionsForCoordinates(coordinates)
    .subscribe(
        result => {
          returnedconditions = result;
        }
    );

    req = httpTestingController.expectOne(api);
  });

  it(`should make one http.get request for weather conditions`, () => {
    expect(req.request.method).toEqual("GET");
  });

  it(`should return conditions of ${expectedconditions.temperature} degrees and ${expectedconditions.description} for latitude ${coordinates.latitude}, longitude ${coordinates.longitude}`, () => {
    req.flush(expectedconditions);
    expect(returnedconditions).toEqual(expectedconditions);  
  });
});
