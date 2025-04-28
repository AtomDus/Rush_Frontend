import { Routes } from '@angular/router';
import {PresaComponent} from './features/presentation/pages/presa/presa.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'presentation',
    pathMatch: 'full'
  },
  {
    path: 'presentation', loadComponent: () => import('./features/presentation/pages/presa/presa.component').then(m => m.PresaComponent)
  },
  {
    path: 'home' , loadComponent: () => import('./features/home/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dash/dash.component').then(m => m.DashComponent)
  },
  {
    path: 'projects/:id', loadComponent: () => import('./features/project/pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent)
  }
];
