import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  api_url = 'http://localhost:5000/user'

  constructor(private http: HttpClient) { }

  getAll():Observable<any> {
    return this.http.get(`${this.api_url}/getall`)
}
}
