import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
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
