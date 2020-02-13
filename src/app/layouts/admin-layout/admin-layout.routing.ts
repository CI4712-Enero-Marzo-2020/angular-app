import { Routes } from '@angular/router';

// Agregar componentes aquí
import { ProjectsComponent } from '../../projects/projects.component';

export const AdminLayoutRoutes: Routes = [
    // Agregar path y respectivo componente aquí
    { path: 'projects',       component: ProjectsComponent }
];
