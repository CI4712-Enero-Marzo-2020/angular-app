import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faGlasses,
  faHandPaper,
  faEdit,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { IntroComponent } from '../../intro/intro.component';
import {LoginComponent} from '../../login/login.component';
import { LoginActivate } from '../../login/login-activate';
import { CreateUsersComponent } from 'src/app/create-users/create-users.component';
import { RegisterComponent } from 'src/app/register/register.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  declarations: [
    // Agregar declaraciones de componentes aquí
    ProjectsComponent,
    DocumentsComponent,
    IntroComponent,
    LoginComponent,
    CreateUsersComponent,
    RegisterComponent
  ],
  providers: [
    LoginActivate,
  ]
})

export class AdminLayoutModule {

  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faGlasses, faHandPaper, faEdit, faTimes);
  }
}
