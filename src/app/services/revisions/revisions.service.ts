import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../users/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class RevisionsService {
	
  url = environment.api;
  userID: any;
  doc_id: any;

  constructor(private http: HttpClient, private authService: AuthService) { 
  	if (authService.getCurrentUser()) {
      this.userID = authService.getCurrentUser().userId;
    }
  }

  create_revision(date, version, desc, teams) {
    //this.doc_id = this.http.get(`${this.url}docs/get/${project}`);
    this.doc_id = 1; // Necesito una manera de obtener el id del documento
    const formData = new FormData();
    formData.append('doc_id', this.doc_id );
    formData.append('date', date);
    formData.append('version', version);
    formData.append('description', desc );
    formData.append('teams', teams );
  	
  	this.http.post(`${this.url}docs/add/revisions`, formData)

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
