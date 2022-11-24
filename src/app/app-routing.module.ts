import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DeviceComponent } from './components/device/device.component';
import { DeviceDetailsComponent } from './components/device-details/device-details.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { NotificationComponent } from './components/notification/notification.component';
import { HumidityComponent } from './components/humidity/humidity.component';

const routes : Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'devices', component: DeviceComponent },
  {path : "devices/:id", component : DeviceDetailsComponent},
  { path: 'notifications', component: NotificationComponent },
  { path: 'temperatures', component: TemperatureComponent },
  { path: 'humidity', component: HumidityComponent },
  {path : "", redirectTo : "/home", pathMatch : "full"}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports : [RouterModule]
})
export class AppRoutingModule { }
