import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/users/auth.service';
import { IntroService } from '../services/intro/intro.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})

export class IntroComponent implements OnInit {
  
  project: string;
  content: string;
  addIntroForm: FormGroup;
  userID: any;

  constructor(
    private IntroService: IntroService,
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
    this.addIntroForm = this.formBuilder.group({
      project: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  async addIntro() {
    const formData = new FormData();
    formData.append('content', this.addIntroForm.get('content').value);
    formData.append('doc_id', this.addIntroForm.get('doc_id').value);
    const newIntro = await this.IntroService.create_intro(this.addIntroForm.get('content').value, this.addIntroForm.get('doc_id').value);
  }

  limpiarCampos() {
    this.project = '';
    this.content = '';
  }

}
