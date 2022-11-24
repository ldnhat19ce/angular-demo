import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/common/model/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  devices! : Device[];

  constructor(private deviceService : DeviceService) { }

  ngOnInit(): void {
    this.listDevices();
  }

  listDevices() {
    this.deviceService.userGetAllDevice().subscribe(data => {
      this.devices = data;
    });
  }

}
