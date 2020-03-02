import { Routes } from '@angular/router';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { IntroComponent } from '../../intro/intro.component';
import { LoginActivate } from 'src/app/login/login-activate';
import { LoginComponent } from 'src/app/login/login.component';
import { CreateUsersComponent } from 'src/app/create-users/create-users.component';
import { RegisterComponent } from 'src/app/register/register.component';

export const AdminLayoutRoutes: Routes = [
    // Agregar path y respectivo componente aquí
    { path: 'projects',       component: ProjectsComponent, canActivate:[LoginActivate]},
    { path: 'documents',       component: DocumentsComponent, canActivate:[LoginActivate]},
    { path: 'intro',       component: IntroComponent, canActivate:[LoginActivate]},
    { path: 'login', component: LoginComponent},
    { path: 'create-users', component:CreateUsersComponent},
    { path: 'register', component:RegisterComponent}
];
