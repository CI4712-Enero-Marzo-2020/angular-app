import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SprintplanningService {

  url = environment.api;
  constructor(private http: HttpClient) { }

  // Gets all planning info including planning result
  getPlanning(sprintID: any) {
    return this.http.get(`${this.url}meetings/planning/${sprintID}`)
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
    return this.http.post(`${this.url}meetings/planning/add`, form)
    .toPromise()
    .then(
      (response) => {
        console.log('RESPONSE PLANNING');
        console.log(response);
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log('RESPONSE PLANNING');
        console.log(error);
      }
    );
  }

  edit(planning: any, form: any) {
    return this.http.put(`${this.url}meetings/planning/${planning.id}`, form)
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

  addPlan(planningId: any, form: any) {
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

  editPlan(planId: any, form: any) {
    return this.http.put(`${this.url}meetings/planning/results/${planId}`, form)
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

  deletePlan(planId: any) {
    return this.http.delete(`${this.url}meetings/planning/results/delete/${planId}`)
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
