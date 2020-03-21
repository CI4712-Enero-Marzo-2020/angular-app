import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintDailyService {

  url = environment.api;
  constructor(private http: HttpClient) { }

  getAll(sprintID: any) {
    return this.http.get(`${this.url}meetings/dailies/${sprintID}`)
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
    return this.http.post(`${this.url}meetings/dailies/add`, form)
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

  edit(meetingId: any, form: any) {
    return this.http.put(`${this.url}meetings/dailies/${meetingId}`, form)
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


  delete(dailyId: any) {
    return this.http.delete(`${this.url}meetings/dailies/delete/${dailyId}`)
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
}
