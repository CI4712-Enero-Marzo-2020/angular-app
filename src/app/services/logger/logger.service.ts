import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  url = 'http://localhost:5000/logger/';

  constructor(public http: HttpClient) { }

  public getAll() {
    return this.http.get(this.url + 'getall');
  }
}
