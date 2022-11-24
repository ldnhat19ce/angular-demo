import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/common/model/notification';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications! : Notification[];

  pageNumber : number = 1;
  pageSize : number = 5;
  totalElements : number = 0;

  constructor(private notificationService : NotificationService) { }

  ngOnInit(): void {
    this.pageNotification();
  }

  pageNotification() {
    this.notificationService.userGetPageNotification(this.pageNumber, this.pageSize).subscribe(data => {
      this.notifications = data.content;
      this.pageNumber = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  pageChange(event: PageChangedEvent) : void {
    this.pageNumber = event.page;
    this.pageNotification();
  }
}
