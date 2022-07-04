import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ICoordinates } from '../models/iCoordinates';

import { GeocodingService } from './geocoding.service';
import { ApiService } from './api.service';

describe('GeocodingService', () => {
  let service: GeocodingService;
  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedCoordinates: ICoordinates;

  const api: string = "https://someLatitudeLongitude/api";
  const city: string = "Tipp City";
  const state: string = "OH";
  const expectedCoordinates: ICoordinates = { latitude: "39.88963102486146", longitude: "-84.10662579008196" };
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
    service = TestBed.inject(GeocodingService);
  });
 
  beforeEach(() => {
    service.getLatLongFromCityState(city, state)
    .subscribe(
        results => {
            returnedCoordinates = results;
        }
    );

    // req = httpTestingController.expectOne(api); // Not needed since we're faking an http request
  });

  it(`should return latitude ${expectedCoordinates.latitude}, longitude ${expectedCoordinates.longitude} for ${city}, ${state}`, () => {
    // req.flush(expectedCoordinates); // Not needed since we're faking an http request
    expect(returnedCoordinates).toEqual(expectedCoordinates);  
  });

  //
  // No need to test this now since the geocoding API is being faked.
  //
  // it(`should make http request for weather forecasts`, () => {
  //   expect(req.request.method).toEqual("GET");
  // });
});
