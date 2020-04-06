import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../users/auth.service';

@Injectable({
  providedIn: 'root'
})

export class IntroService {
	
	url = environment.api;
  userID: any;
  doc_id: any;
  constructor(private http: HttpClient, private authService: AuthService) { 
  	if (authService.getCurrentUser()) {
      this.userID = authService.getCurrentUser().userId;
    }
  }

  create_intro(content, project) {

    this.doc_id = this.http.get(`${this.url}docs/get/${project}`)
  	this.http.post(`${this.url}docs/add/intro/`, {doc_id:this.doc_id, content:content})

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

}
