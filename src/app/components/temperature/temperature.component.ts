import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Temperature } from 'src/app/common/model/temperature';
import { TemperatureService } from 'src/app/services/temperature.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  temperatures! : Temperature[];

  pageNumber : number = 1;
  pageSize : number = 5;
  totalElements : number = 0;

  constructor(private temperatureService : TemperatureService) { }

  ngOnInit(): void {
    this.pageTemperature();
  }

  pageTemperature() {
    this.temperatureService.userGetPageTemperature(this.pageNumber, this.pageSize).subscribe(data => {
      this.temperatures = data.content;
      this.pageNumber = data.pageNumber;
      this.pageSize = data.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  pageChange(event: PageChangedEvent) : void {
    this.pageNumber = event.page;
    this.pageTemperature();
  }

}
