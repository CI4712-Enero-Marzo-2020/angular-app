import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  url = environment.api;
  userID: any;
  constructor(private http: HttpClient) {
    this.userID = JSON.parse(localStorage.getItem('currentUser')).id;
   }

   getAll() {
    // const userId = 1;
    return this.http.get(`${this.url}stories/getall/${this.userID}`)
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
    return this.http.post(`${this.url}stories/add`, form)
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

  changeClassification(story: any, form: any) {
    return this.http.patch(`${this.url}stories/classification/${story.id}`, form)
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

  changePriority(story: any, form: any, priority: number) {
    return this.http.patch(`${this.url}stories/classification/${story.id}`, form)
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

  edit(story: any, form: any) {
    return this.http.put(`${this.url}stories/update/${story.id}`, form)
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
