import { Routes } from '@angular/router';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { ProductbacklogComponent } from 'src/app/productbacklog/productbacklog.component';
import { LoggerComponent } from 'src/app/logger/logger.component';
import { DialogComponent } from 'src/app/logger/dialog/dialog.component';
import { LoginActivate } from 'src/app/login/login-activate';
import { LoginComponent } from 'src/app/login/login.component';
import { SprintBacklogComponent } from 'src/app/sprint-backlog/sprint-backlog.component';
import { SprintplanningComponent } from 'src/app/sprintplanning/sprintplanning.component';
import { SprintretrospectiveComponent } from 'src/app/sprintretrospective/sprintretrospective.component';
import { SprinttechnicalComponent } from 'src/app/sprinttechnical/sprinttechnical.component';
import { SprintDetailsComponent } from 'src/app/sprint-details/sprint-details.component';
import { TasksComponent } from 'src/app/tasks/tasks.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { IntroComponent } from '../../intro/intro.component';
import { CreateUsersComponent } from 'src/app/create-users/create-users.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { SprintUnitTestComponent } from 'src/app/sprint-unit-test/sprint-unit-test.component';
import { SprintUiTestComponent } from 'src/app/sprint-ui-test/sprint-ui-test.component';

export const AdminLayoutRoutes: Routes = [
    // Agregar path y respectivo componente aquí
    { path: 'productbacklog/:id',       component: ProductbacklogComponent, canActivate: [LoginActivate] },
    { path: 'projects',       component: ProjectsComponent, canActivate: [LoginActivate]},
    { path: 'login', component: LoginComponent},
    { path: 'logger', component: LoggerComponent, children: [{
      path: 'delete', component: DialogComponent
    }] },
    { path: 'sprint/:id', component: SprintBacklogComponent},
    { path: 'sprint/details/:id', component: SprintDetailsComponent, children: [
      { path: 'task/create', component: TasksComponent },
    ]},
    { path: 'documents',       component: DocumentsComponent, canActivate: [LoginActivate]},
    { path: 'intro',       component: IntroComponent, canActivate: [LoginActivate]},
    { path: 'create-users', component: CreateUsersComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'sprintplanning/:id', component: SprintplanningComponent},
    { path: 'sprintretrospective/:id', component: SprintretrospectiveComponent},
    { path: 'sprinttechnical/:id', component: SprinttechnicalComponent},
    { path: 'sprintunittest/:id', component: SprintUnitTestComponent},
    { path: 'sprintuitest/:id', component: SprintUiTestComponent}
];
