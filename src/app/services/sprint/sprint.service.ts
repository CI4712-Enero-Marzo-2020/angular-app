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
  urlTasks = 'http://localhost:5000/tasks/';

  createSprint(params) {
    console.log(params);
    return this.http.post(this.urlSprint + 'add', params, {headers: {'Content-Type': 'application/json',
                                                                      'Access-Control-Allow-Origin': '*',
                                                                      }});
  }

  addStory(sprintId, storyId) {
    return this.http.get(this.urlSprint + 'addstory/' + sprintId + '/' + storyId);
  }
  getProjectStories(id) {
    return this.http.get(this.urlStories + 'getall/' + id);
  }

  getSprintStories(id) {
    return this.http.get(this.urlSprint + 'getstories/' + id);
  }

  getSprintByProject(id) {
    return this.http.get(this.urlSprint + 'getbyproject/' + id);
  }

  getSprintDetails(id) {
    return this.http.get(this.urlSprint + id);
  }

  getSprintActive(id) {
    return this.http.get(this.urlSprint + 'active/' + id);
  }

  editSprint(id, params) {
    return this.http.put(this.urlSprint + 'update/' + id, params);
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

  deleteTest(testId) {
    return this.http.post(this.urlPruebas + 'delete/' + testId, []);
  }

  deleteCriteria(citeriaId) {
    return this.http.post(this.urlCriterios + 'delete/' + citeriaId, []);
  }

  createTask(params) {
    return this.http.post( this.urlTasks + 'add', params);
  }

  editTask(id,params) {
    return this.http.post(this.urlTasks + 'update/' + id, params);
  }

  getAllTasks(id) {
    return this.http.get(this.urlTasks + 'getbysprint/' + id);
  }

  deleteTask(id) {
    return this.http.post(this.urlTasks + 'delete/' + id, {});
  }

}
