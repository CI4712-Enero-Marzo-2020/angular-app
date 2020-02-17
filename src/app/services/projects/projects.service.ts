import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  constructor(private http: HttpClient) { }

  // TODO: falta verificar si el usuario esta autenticado
  getAll() {
    const userId = '1';
    return this.http.get(`url/${userId}`)
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


  create(project: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: '?'
    });
    const userId = 1;
    const jsonStruct =  JSON.stringify({...project, user_id: userId});
    return this.http.post('url', jsonStruct, {headers})
    .toPromise()
    .then(
      (response) => {
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );
  }

  edit(project: any) {
    const projectId = project.id;
    const userId = 1;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: '?'
    });
    const jsonStruct =  JSON.stringify({...project, user_id: userId});
    return this.http.put(`url/${projectId}`, jsonStruct, {headers})
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

  changeStatus(project: any,  action: string) {
    const url = action === 'pause' ? 'pausarUrl' : 'reactivar';
    const projectId = project.id;
    return this.http.put(`${url}/${projectId}`, {})
    .toPromise()
    .then(
      (response) => {
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );
  }

  delete(project: any) {
    const projectId = project.id;
    return this.http.delete(`url/${projectId}`)
    .toPromise()
    .then(
      (response) => {
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );

  }
}
