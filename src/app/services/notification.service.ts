import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Notification } from '../common/model/notification';

const NOTIFICATION_URL = "http://localhost:8080/api/v1/user/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient : HttpClient, private token : TokenStorageService) { }

  listenNotificationDeviceEvent(deviceId : string, onNotificationDevice : (event : any) => void) : EventSource {
    const eventSource = new EventSource(NOTIFICATION_URL + "/stream/device/"+deviceId + "?userId=" + this.token.getUser()['userId']);
    eventSource.addEventListener("list_notification_by_device", (event : MessageEvent) => {
      onNotificationDevice(event.data);
    });
    return eventSource;
  }

  userGetPageNotification(
            pageNumber : number,
            pageSize : number) : Observable<GetPageNotification> {
    const url = NOTIFICATION_URL + "?page=" + pageNumber + "&limit=" + pageSize;
    return this.httpClient.get<GetPageNotification>(url);
  }
}

interface GetPageNotification{
  content : Notification[],
  pageNumber : number;
  pageSize : number;
  totalElements : number;
  last : Boolean;
  first : Boolean;
  totalPages : number;
} 
