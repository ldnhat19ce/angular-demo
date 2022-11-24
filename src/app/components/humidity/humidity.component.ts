import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Humidity } from 'src/app/common/model/humidity';
import { HumidityService } from 'src/app/services/humidity.service';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css']
})
export class HumidityComponent implements OnInit {
  humidity! : Humidity[];

  pageNumber : number = 1;
  pageSize : number = 5;
  totalElements : number = 0;

  constructor(private humidityService : HumidityService) { }

  ngOnInit(): void {
    this.pageHumidity();
  }

  pageHumidity() {
    this.humidityService.userGetPageHumidity(this.pageNumber, this.pageSize).subscribe(data => {
      this.humidity = data.content;
      this.pageNumber = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  pageChange(event: PageChangedEvent) : void {
    this.pageNumber = event.page;
    this.pageHumidity();
  }

}
