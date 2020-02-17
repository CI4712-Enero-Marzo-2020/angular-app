import { Routes } from '@angular/router';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { LoginActivate } from 'src/app/login/login-activate';
import { LoginComponent } from 'src/app/login/login.component';

export const AdminLayoutRoutes: Routes = [
    // Agregar path y respectivo componente aquí
    { path: 'projects',       component: ProjectsComponent, canActivate:[LoginActivate]},
    { path: 'login', component: LoginComponent}
];
