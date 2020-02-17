import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    api_url = 'http://localhost:5000/user'

    constructor(private http: HttpClient) {

    
    }


    getAll() {
        return this.http.get(`${this.api_url}/getall`)
    }

    login(username:string,password:string):Observable<any>{
        return this.http.post(`${this.api_url}/login`,{username:username,password:password})
    }

    isLoggedIn(){
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser){
            return true
        }
        else{
            return false
        }

    }
}