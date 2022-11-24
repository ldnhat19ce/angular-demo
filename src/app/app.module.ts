import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { DeviceComponent } from './components/device/device.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { HumidityComponent } from './components/humidity/humidity.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DeviceComponent,
    DeviceDetailsComponent,
    NotificationComponent,
    TemperatureComponent,
    HumidityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginationModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
