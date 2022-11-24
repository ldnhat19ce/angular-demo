import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private eventSource!: EventSource;
  amountDevice! : number;

  constructor(private tokenStorageService: TokenStorageService, private deviceService : DeviceService) { }

  ngOnInit(): void {
    this.startEventListener();
  }

  
  private startEventListener() {
    this.eventSource = this.deviceService.listenAmountDeviceEvent(
      (e) => this.onAmountDevice(e)
    );
  }

  private onAmountDevice(event : any) {
    this.amountDevice = event;
  }

  onDestroyEventListener() {
    this.eventSource.close();
  }
}
