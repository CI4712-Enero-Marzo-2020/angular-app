import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(public http: HttpClient) { }
  urlStories = 'http://localhost:5000/stories/';
  urlSprint = 'http://localhost:5000/sprint/';
  urlCriterios = 'http://localhost:5000/criteria/"';
  urlPruebas = 'http://localhost:5000/tests/';

  getProjectStories(id) {
    return this.http.get(this.urlStories + 'getall/' + id);
  }

  getSprintByProject(id) {
    return this.http.get(this.urlSprint + 'getbyproject/' + id);
  }

  getCriteriaByStory(id) {
    return this.http.get(this.urlCriterios + 'getbystory/' + id);

  }

  getTestByStory(id) {
    return this.http.get(this.urlPruebas + 'getbystory/' + id);
  }

}
