import { Injectable, OnInit } from '@angular/core';
import { Device } from '../common/model/device';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const DEVICE_URL = "http://localhost:8080/api/v1/user/device";

const httpOptions = {
  headers : new HttpHeaders({'Content-Type': 'application/json', })
};

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private httpClient : HttpClient, private token : TokenStorageService) { }

  listenAmountDeviceEvent(onAmountDevice : (event : any) => void) : EventSource {
    const eventSource = new EventSource(DEVICE_URL + "/stream/amount?userId=" + this.token.getUser()['userId'])
    eventSource.addEventListener("amount_device", (event : MessageEvent) => {
      onAmountDevice(event.data);
    })

    return eventSource;
  }

  userGetAllDevice() : Observable<Device[]> {
    return this.httpClient.get<GetResponse>(DEVICE_URL).pipe(
      map(response => response.content)
    );
  }

  listenStateDeviceEvent(deviceId : string, onDeviceState : (event : any) => void) : EventSource {
    const eventSource = new EventSource(DEVICE_URL + "/stream/state/"+deviceId);
    eventSource.addEventListener("device_state_event", (event : MessageEvent) => {
        onDeviceState(event.data);
    });
    return eventSource;
  }

  userGetDetailDevice(deviceId : string) : Observable<Device> {
    return this.httpClient.get<GetDetailResponse>(DEVICE_URL + "/" + deviceId).pipe(
      map(response => response.data)
    );
  }

  userChangeStateDevice(deviceId : string) : Observable<any> {
    return this.httpClient.put(DEVICE_URL + "/state/" + deviceId, null);
  }
}

interface GetResponse{
  content : Device[],
  pageNumber : number;
  pageSize : number;
  totalElements : number;
  last : Boolean;
  first : Boolean;
  totalPages : number;
} 

interface GetDetailResponse{
  code : number;
  data : Device;
}