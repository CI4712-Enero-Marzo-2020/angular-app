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
  faTimes,
  faArrowAltCircleUp,
  faPen,
  faPlay,
  faCheckCircle,
  faTimesCircle,
  faPlusCircle,
  faSearch,
  faAddressBook,
  faScroll,
  faCheck,
  faEraser
} from '@fortawesome/free-solid-svg-icons';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { ProductbacklogComponent } from '../../productbacklog/productbacklog.component';
import {LoginComponent} from '../../login/login.component';
import { LoginActivate } from '../../login/login-activate';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { LoggerComponent } from 'src/app/logger/logger.component';
import { DialogComponent } from 'src/app/logger/dialog/dialog.component';
import { SprintBacklogComponent } from 'src/app/sprint-backlog/sprint-backlog.component';
import { SprintplanningComponent } from 'src/app/sprintplanning/sprintplanning.component';
import { SprintretrospectiveComponent } from 'src/app/sprintretrospective/sprintretrospective.component';
import { SprinttechnicalComponent } from 'src/app/sprinttechnical/sprinttechnical.component';
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
    MatDialogModule
  ],
  declarations: [
    // Agregar declaraciones de componentes aquí
    ProjectsComponent,
    ProductbacklogComponent,
    LoginComponent,
    LoggerComponent,
    DialogComponent,
    SprintBacklogComponent,
    SprintplanningComponent,
    SprintretrospectiveComponent,
    SprinttechnicalComponent
  ],
  providers: [
    LoginActivate,
  ]
})

export class AdminLayoutModule {

  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faGlasses,
                    faHandPaper,
                    faEdit,
                    faTimes,
                    faEraser,
                    faArrowAltCircleUp,
                    faPen,
                    faPlay,
                    faCheckCircle,
                    faTimesCircle,
                    faPlusCircle,
                    faSearch,
                    faAddressBook,
                    faScroll, faCheck);
  }
}
