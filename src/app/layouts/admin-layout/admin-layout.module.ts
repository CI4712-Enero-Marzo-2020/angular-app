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
  faEraser,
  faSignal,
  faArrowAltCircleDown
} from '@fortawesome/free-solid-svg-icons';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { ProductbacklogComponent } from '../../productbacklog/productbacklog.component';
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
  MatSelectModule,
  MatDialogModule,
  MatTabGroup,
  MatTabsModule
} from '@angular/material';
import { LoggerComponent } from 'src/app/logger/logger.component';
import { DialogComponent } from 'src/app/logger/dialog/dialog.component';
import { SprintBacklogComponent } from 'src/app/sprint-backlog/sprint-backlog.component';
import { SprintDetailsComponent } from 'src/app/sprint-details/sprint-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from 'src/app/tasks/tasks.component';
import { SprintGraphsComponent } from 'src/app/sprint-graphs/sprint-graphs.component';
import { SprintBurnDownComponent } from 'src/app/sprint-burn-down/sprint-burn-down.component';
import { SprintBurnUpComponent } from 'src/app/sprint-burn-up/sprint-burn-up.component';
import { ChartsModule } from 'ng2-charts';
import { AddDayComponent } from 'src/app/add-day/add-day.component';
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
    MatDialogModule,
    MatTabsModule,
    NgSelectModule,
    ChartsModule
  ],
  declarations: [
    // Agregar declaraciones de componentes aquí
    ProjectsComponent,
    ProductbacklogComponent,
    LoginComponent,
    LoggerComponent,
    DialogComponent,
    SprintBacklogComponent,
    SprintDetailsComponent,
    TasksComponent,
    DocumentsComponent,
    IntroComponent,
    CreateUsersComponent,
    RegisterComponent,
    SprintGraphsComponent,
    SprintBurnDownComponent,
    SprintBurnUpComponent,
    AddDayComponent
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
                    faScroll, faCheck, faSignal, faArrowAltCircleDown);
  }
}
