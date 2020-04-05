import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UITestsService {

  url = environment.api;
  constructor(private http: HttpClient) { }

  getAll(sprintID: any) {
    return this.http.get(`${this.url}tests/user-interface/${sprintID}`)
    .toPromise()
    .then(
      (response: any[]) => {
        return response;
    },
      (error) => {
        console.log(error);
        return null;
      }
    );
  }

  create(form: any) {
    return this.http.post(`${this.url}tests/user-interface/add`, form)
    .toPromise()
    .then(
      (response) => {
        console.log('RESPONSE');
        console.log(response);
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log('RESPONSE');
        console.log(error);
      }
    );
  }

  edit(test: any, form: any) {
    return this.http.put(`${this.url}tests/user-interface/${test.id}`, form)
    .toPromise()
    .then(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  delete(testId: any) {
    return this.http.delete(`${this.url}tests/user-interface/delete/${testId}`)
    .toPromise()
    .then(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );

  }
}
