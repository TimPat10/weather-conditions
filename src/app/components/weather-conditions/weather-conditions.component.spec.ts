import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ICoordinates } from 'src/app/models/iCoordinates';
import { IWeatherConditions } from 'src/app/models/iWeather-conditions';
import { WeatherConditionsService } from 'src/app/services/weather-conditions.service';

import { WeatherconditionsComponent } from './weather-conditions.component';

fdescribe('WeatherconditionsComponent', () => {
  let component: WeatherconditionsComponent;
  let fixture: ComponentFixture<WeatherconditionsComponent>;
  let txtCityStateElement: any;
  let btnCityStateGoElement: any;

  let req: TestRequest;
  let httpTestingController: HttpTestingController;
  let returnedconditions: IWeatherConditions;

  const api: string = "https://someWeatherconditions/api";
  const coordinates: ICoordinates = {
    latitude: "39.88963102486146",
    longitude: "-84.10662579008196"
  };

  const expectedconditions: IWeatherConditions = { temperature: "78", description: "Sunny" };
  const weatherconditionsServiceSpy = jasmine.createSpyObj('WeatherconditionsService', ['getconditionsForCoordinates']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
          FormsModule
      ],
      providers: [
         { provide: WeatherConditionsService, useValue: weatherconditionsServiceSpy },
      ],
      declarations: [ WeatherconditionsComponent ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(WeatherconditionsComponent);
      component = fixture.componentInstance;
      weatherconditionsServiceSpy.getconditionsForCoordinates.and.returnValue(expectedconditions);

      txtCityStateElement = fixture.nativeElement.querySelector('[id="txtCityState"]');
      btnCityStateGoElement = fixture.nativeElement.querySelector('[id="btnCityStateGo"');

      fixture.detectChanges();
    });
  }));

  it('should provide a textbox for City and State with a GO button', () => {
    expect(txtCityStateElement).toBeTruthy();
    expect(btnCityStateGoElement).toBeTruthy();
  });

  it('should get a conditions for Tipp City, OH when the GO button is clicked', () => {
    txtCityStateElement.textContent = "Tipp City, OH";
    btnCityStateGoElement.click();

    fixture.detectChanges();
    expect(component.currentConditions).toEqual(expectedconditions);
  })
});
