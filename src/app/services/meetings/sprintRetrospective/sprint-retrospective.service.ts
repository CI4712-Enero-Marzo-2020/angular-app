import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintRetrospectiveService {

  url = environment.api;
  constructor(private http: HttpClient) { }

  getAll(sprintID: any) {
    return this.http.get(`${this.url}meetings/retrospectives/${sprintID}`)
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
    return this.http.post(`${this.url}meetings/retrospectives/add`, form)
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

  edit(meeting: any, form: any) {
    return this.http.put(`${this.url}meetings/retrospectives/${meeting.id}`, form)
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

  addResultToPlanning(planningId: any, form: any) {
    return this.http.post(`${this.url}meetings/planning/${planningId}/results/add`, form)
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

  editPlanningResult(resultId: any, form: any) {
    return this.http.put(`${this.url}meetings/planning/results/${resultId}`, form)
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

  delete(retrospectiveId: any) {
    return this.http.delete(`${this.url}meetings/retrospectives/delete/${retrospectiveId}`)
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
