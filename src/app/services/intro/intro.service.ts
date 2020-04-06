import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../users/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    const formData = new FormData();
    formData.append('content', content);
    formData.append('doc_id', this.doc_id );

  	this.http.post(`${this.url}docs/add/intro/`, formData)

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
