import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Humidity } from '../common/model/humidity';

const HUMIDITY_URL = "http://localhost:8080/api/v1/user/humidity";

@Injectable({
  providedIn: 'root'
})
export class HumidityService {

  constructor(private httpClient : HttpClient) { }

  userGetPageHumidity(
                          pageNumber : number,
                          pageSize : number) : Observable<GetPageHumidity> {
    const url = HUMIDITY_URL + "?page=" + pageNumber + "&limit=" + pageSize;
    return this.httpClient.get<GetPageHumidity>(url);
  }
}

interface GetPageHumidity{
  content : Humidity[],
  pageNumber : number;
  pageSize : number;
  totalElements : number;
  last : Boolean;
  first : Boolean;
  totalPages : number;
} 

