import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/users/auth.service';
import { RevisionsService } from '../services/revisions/revisions.service';

@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss']
})

export class RevisionsComponent implements OnInit {
  
  date: string;
  version: string;
  desc: string;
  teams: string;
  addRevisionsForm: FormGroup;
  userID: any;

  constructor(
    private RevisionsService: RevisionsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) {
    // this.getAllDocs();
    if (authService.getCurrentUser()) {
      this.userID = authService.getCurrentUser().userId;
    }
  }

  ngOnInit() {
    this.addRevisionsForm = this.formBuilder.group({
      date: ['', Validators.required],
      version: ['', Validators.required],
      desc: ['', Validators.required],
      teams: ['', Validators.required],
    });
  }

  async addRevision() {
    const formData = new FormData();
    formData.append('date', this.addRevisionsForm.get('date').value);
    formData.append('version', this.addRevisionsForm.get('version').value);
    formData.append('desc', this.addRevisionsForm.get('desc').value);
    formData.append('teams', this.addRevisionsForm.get('teams').value);
    const newRevision = await this.RevisionsService.create_revision(this.addRevisionForm.get('date').value, this.addRevisionForm.get('version').value, this.addRevisionForm.get('desc').value, this.addRevisionForm.get('teams').value);
  }

  limpiarCampos() {
    this.project = '';
    this.content = '';
  }

}
