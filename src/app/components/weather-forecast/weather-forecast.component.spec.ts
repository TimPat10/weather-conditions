import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ICoordinates } from 'src/app/models/iCoordinates';
import { IWeatherForecast } from 'src/app/models/iWeather-forecast';
import { WeatherForecastService } from 'src/app/services/weather-forecast.service';

import { WeatherForecastComponent } from './weather-forecast.component';

fdescribe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let txtCityStateElement: any;
  let btnCityStateGoElement: any;

  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedForecast: IWeatherForecast;

  const api: string = "https://someWeatherForecast/api";
  const coordinates: ICoordinates = {
    latitude: "39.88963102486146",
    longitude: "-84.10662579008196"
  };

  const expectedForecast: IWeatherForecast = { temperature: "78", description: "Sunny" };
  const weatherForecastServiceSpy = jasmine.createSpyObj('WeatherForecastService', ['getForecastForCoordinates']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
          FormsModule
      ],
      providers: [
         { provide: WeatherForecastService, useValue: weatherForecastServiceSpy },
      ],
      declarations: [ WeatherForecastComponent ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(WeatherForecastComponent);
      component = fixture.componentInstance;
      weatherForecastServiceSpy.getForecastForCoordinates.and.returnValue(expectedForecast);

      txtCityStateElement = fixture.nativeElement.querySelector('[id="txtCityState"]');
      btnCityStateGoElement = fixture.nativeElement.querySelector('[id="btnCityStateGo"');

      fixture.detectChanges();
    });
  }));

  it('should provide a textbox for City and State with a GO button', () => {
    expect(txtCityStateElement).toBeTruthy();
    expect(btnCityStateGoElement).toBeTruthy();
  });

  it('should get a forecast for Tipp City, OH when the GO button is clicked', () => {
    txtCityStateElement.textContent = "Tipp City, OH";
    btnCityStateGoElement.click();

    fixture.detectChanges();
    expect(component.forecast).toEqual(expectedForecast);
  })
});
