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
    return this.http.post(`${this.url}projects/add`, project)
    .toPromise()
    .then(
      (response) => {
        console.log('RESPONSE');
        console.log(response)
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log('RESPONSE');
        console.log(error);
      }
    );
  }

  edit(project: any, form: any) {
    return this.http.put(`${this.url}projects/update/${project.id}`, form)
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
    return this.http.get(url)
    .toPromise()
    .then(
      (response) => {
        console.log(response)
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );
  }

  delete(project: any) {
    const id = project.id;
    return this.http.get(`${this.url}projects/delete/${id}`)
    .toPromise()
    .then(
      (response) => {
        console.log(response)
        return response;
      },
      (error) => {
        // Devuelvo null
        console.log(error);
      }
    );

  }
}
