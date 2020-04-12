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
import { RevisionsComponent } from '../../revisions/revisions.component';
import {LoginComponent} from '../../login/login.component';
import { LoginActivate } from '../../login/login-activate';
import { CreateUsersComponent } from 'src/app/create-users/create-users.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { LogoutComponent } from 'src/app/login/login.component';
import { DocumentListComponent} from 'src/app/document-list/document-list.component';


import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MatTabGroup,
  MatTabsModule
} from '@angular/material';


import { LoggerComponent } from 'src/app/logger/logger.component';
import { DialogComponent } from 'src/app/logger/dialog/dialog.component';
import { SprintBacklogComponent } from 'src/app/sprint-backlog/sprint-backlog.component';
import { SprintplanningComponent } from 'src/app/sprintplanning/sprintplanning.component';
import { SprintretrospectiveComponent } from 'src/app/sprintretrospective/sprintretrospective.component';
import { SprinttechnicalComponent } from 'src/app/sprinttechnical/sprinttechnical.component';
import { SprintDetailsComponent } from 'src/app/sprint-details/sprint-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from 'src/app/tasks/tasks.component';
import { SprintGraphsComponent } from 'src/app/sprint-graphs/sprint-graphs.component';
import { SprintBurnDownComponent } from 'src/app/sprint-burn-down/sprint-burn-down.component';
import { SprintBurnUpComponent } from 'src/app/sprint-burn-up/sprint-burn-up.component';
import { ChartsModule } from 'ng2-charts';
import { AddDayComponent } from 'src/app/add-day/add-day.component';
import { SprintUiTestComponent } from 'src/app/sprint-ui-test/sprint-ui-test.component';
import { SprintUnitTestComponent } from 'src/app/sprint-unit-test/sprint-unit-test.component';
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
    MatDatepickerModule,
    MatNativeDateModule,
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
    SprintplanningComponent,
    SprintretrospectiveComponent,
    SprinttechnicalComponent,
    SprintDetailsComponent,
    TasksComponent,
    DocumentsComponent,
    IntroComponent,
    RevisionsComponent,
    CreateUsersComponent,
    RegisterComponent,
    SprintGraphsComponent,
    SprintBurnDownComponent,
    SprintBurnUpComponent,
    AddDayComponent,
    SprintUnitTestComponent,
    SprintUiTestComponent,
    LogoutComponent,
    DocumentListComponent,
  ],
  providers: [
    LoginActivate,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    }
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
