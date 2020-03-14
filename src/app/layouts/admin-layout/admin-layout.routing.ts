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

export const AdminLayoutRoutes: Routes = [
    // Agregar path y respectivo componente aquí
    { path: 'productbacklog/:id',       component: ProductbacklogComponent, canActivate: [LoginActivate] },
    { path: 'projects',       component: ProjectsComponent, canActivate: [LoginActivate]},
    { path: 'login', component: LoginComponent},
    { path: 'logger', component: LoggerComponent, children: [{
      path: 'delete', component: DialogComponent
    }] },
    { path: 'sprint/:id', component: SprintBacklogComponent},
    { path: 'sprintplanning', component: SprintplanningComponent},
    { path: 'sprintretrospective', component: SprintretrospectiveComponent},
    { path: 'sprinttechnical', component: SprinttechnicalComponent}

];
