import { TestBed } from '@angular/core/testing';
import { zip } from 'rxjs';
import { ICoordinates } from '../models/iCoordinates';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  const openWeatherMapBaseApi: string = "https://openweathermap.org/data/2.5/weather";
  const openWeatherMapKey: string  = "cf002751564a4c78f5f7ed479f1b9ba3";

  const someLatLongBaseApi: string = "https://someLatitudeLongitudeApi";
  const someLatLongApiKey: string  = "someLatLongApiKey";

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should return a Weather Forecast API for Latitude / Longitude', () => {
    const coordinates: ICoordinates = {
      latitude: "39.88963102486146",
      longitude: "-84.10662579008196"
    };

    
    const params = `lat=${coordinates.latitude}&lon=${coordinates.longitude}&apiid=${openWeatherMapKey}`;
    const expectedApi = `${openWeatherMapBaseApi}?${params}`.toLowerCase();
    const actualApi = service.getForecastByCoordinatesApi(coordinates).toLowerCase();

    expect(actualApi).toBe(expectedApi);
  });

  it('should return a Latitude/Longitude API from City and State', () => {

    const city = "Tipp City";
    const cityParam = encodeURIComponent(city.trim());
    const state = "OH";

    const params = `city=${cityParam}&state=${state}&apiid=${someLatLongApiKey}`;
    const expectedApi = `${someLatLongBaseApi}?${params}`.toLowerCase();
    const actualApi = service.getLatLongFromCityStateApi(city, state).toLowerCase();

    expect(actualApi).toBe(expectedApi);
  });

  it('should return a Latitude/Longitude API from Zip Code', () => {
    const zipcode = "45371";
    const zipcodeParam = encodeURIComponent(zipcode.trim());

    const params = `zip=${zipcodeParam}&apiid=${someLatLongApiKey}`;
    const expectedApi = `${someLatLongBaseApi}?${params}`.toLowerCase();
    const actualApi = service.getLatLongFromZipApi(zipcode).toLowerCase();

    expect(actualApi).toBe(expectedApi);
  });
});
