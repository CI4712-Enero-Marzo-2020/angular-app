import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  url = environment.api;
  constructor(private http: HttpClient) { }

  // TODO: falta verificar si el usuario esta autenticado
  getAll() {
    const userId = 1;
    return this.http.get(`${this.url}projects/getall/${userId}`)
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


  create(project: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: '?'
    });
    const userId = 2;
    const jsonStruct =  JSON.stringify({...project, user_id: userId});
    return this.http.post(`${this.url}projects/add`, jsonStruct, {headers})
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
    const userId = 1;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      token: '?'
    });
    const jsonStruct =  JSON.stringify({...project, user_id: userId});
    return this.http.put(`${this.url}projects/update/${project.id}`, jsonStruct, {headers})
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
    const url = action === 'pause' ? `${this.url}projects/pause/${project.id}` : `${this.url}projects/reactivate/${project.id}`;
    return this.http.put(url, {})
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
    return this.http.delete(`${this.url}projects/pause/${project.id}`)
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
