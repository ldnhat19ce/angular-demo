import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Temperature } from '../common/model/temperature';

const TEMPERATURE_URL = "http://localhost:8080/api/v1/user/temperatures";

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private httpClient : HttpClient) { }

  userGetPageTemperature(
                          pageNumber : number,
                          pageSize : number) : Observable<GetPageTemperature> {
    const url = TEMPERATURE_URL + "?page=" + pageNumber + "&limit=" + pageSize;
    return this.httpClient.get<GetPageTemperature>(url);
  }
}

interface GetPageTemperature{
  content : Temperature[],
  pageNumber : number;
  pageSize : number;
  totalElements : number;
  last : Boolean;
  first : Boolean;
  totalPages : number;
} 
