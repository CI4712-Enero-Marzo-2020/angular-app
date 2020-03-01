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
   }

   getAll(projectID: any) {
    // const userId = 1;
    return this.http.get(`${this.url}stories/getall/${projectID}`)
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

  changeClassification(story: any) {
    return this.http.patch(`${this.url}stories/classification/${story.id}`, {})
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

  changePriority(story: any, priority: string) {
    return this.http.patch(`${this.url}stories/${priority}/${story.id}`, {})
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

  addStoryToEpic(storyId: any, epicId: any) {
    return this.http.put(`${this.url}stories/add_to_epic/${storyId}/${epicId}`, {})
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

  deleteStoryToEpic(story: any, form: any) {
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

  delete(story: any) {
    const id = story.id;
    return this.http.delete(`${this.url}stories/delete/${id}`)
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
