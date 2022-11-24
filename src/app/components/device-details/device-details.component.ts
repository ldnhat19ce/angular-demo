import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/app/common/model/device';
import { Notification } from 'src/app/common/model/notification';
import { DeviceService } from 'src/app/services/device.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {
  private eventSource!: EventSource;
  private eventSource1!: EventSource;
  stateDevice! : string;
  device! : Device;
  deviceId! : string;
  notifications : Notification[] = [];
  notification! : Notification;

  constructor(private deviceService : DeviceService, 
              private route : ActivatedRoute, 
              private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const deviceId : string = this.route.snapshot.paramMap.get("id")!;
      this.deviceId = deviceId;
      this.getDetailDevice(deviceId);
      this.startDeviceStateListener(deviceId);
      this.startNotificationDeviceListener(deviceId);
    })
  }

  private startDeviceStateListener(deviceId : string) {
    this.eventSource = this.deviceService.listenStateDeviceEvent(deviceId, 
      (e) => this.onStateDevice(e)
    );
  }

  private onStateDevice(event : any) {
    this.stateDevice = event;
  }

  onDestroyEventListener() {
    this.eventSource.close();
    this.eventSource1.close();
  }

  private getDetailDevice(deviceId : string) {
    this.deviceService.userGetDetailDevice(deviceId).subscribe(data => {
      this.device = data;
    });
  }

  onChangeStateDevice() {
    this.deviceService.userChangeStateDevice(this.deviceId).subscribe(
      data => console.log(data)
    );
  }

  private startNotificationDeviceListener(deviceId : string) {
    this.eventSource1 = this.notificationService.listenNotificationDeviceEvent(deviceId, 
      (e) => this.onNotificationDevice(e));
  }

  onNotificationDevice(event : any) {
    this.notification = JSON.parse(event);
    this.notifications.push(this.notification);
    if (this.notifications.length > 4) {
      this.notifications.shift();
    }
  }
}
