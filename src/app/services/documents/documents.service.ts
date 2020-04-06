import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  api_url = 'http://localhost:5000/docs';

  constructor(private http:HttpClient) { }

  saveDoc(formDocumentData):Observable<any>{
    return this.http.post(`${this.api_url}/add`,formDocumentData);
}
  getAll():Observable<any>{
    return this.http.get(`${this.api_url}/getall`);
  }
}
