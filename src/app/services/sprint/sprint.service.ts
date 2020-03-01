import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(public http: HttpClient) { }
  urlStories = 'http://localhost:5000/stories/';
  urlSprint = 'http://localhost:5000/sprint/';
  urlCriterios = 'http://localhost:5000/criteria/';
  urlPruebas = 'http://localhost:5000/tests/';

  createSprint(params) {
    console.log(params);
    return this.http.post(this.urlSprint + 'add', params, {headers: {'Content-Type': 'application/json',
                                                                      'Access-Control-Allow-Origin': '*',
                                                                      }});
  }

  addStory(sprintId, storyId) {
    console.log(sprintId,storyId);
    return this.http.patch(this.urlSprint + 'addstory/' + sprintId + '/' + storyId, []);
  }
  getProjectStories(id) {
    return this.http.get(this.urlStories + 'getall/' + id);
  }

  getSprintByProject(id) {
    return this.http.get(this.urlSprint + 'getbyproject/' + id);
  }

  getCriteriaByStory(id) {
    return this.http.get(this.urlCriterios + 'getbystory/' + id);

  }

  addCriteria(params) {
    return this.http.post(this.urlCriterios + 'add', params);
  }

  addTest(params) {
    return this.http.post(this.urlPruebas + 'add', params);
  }

  getTestByStory(id) {
    return this.http.get(this.urlPruebas + 'getbystory/' + id);
  }

  editTestapi(testId, params) {
    return this.http.put('http://localhost:5000/test/update/' + testId, params);
  }

  editCriteria(citeriaId, params) {
    return this.http.put(this.urlCriterios + 'update/' + citeriaId, params);
  }

}
