import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherForecastComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
