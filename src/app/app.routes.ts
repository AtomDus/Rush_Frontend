import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dash/dash.component').then(m => m.DashComponent)
  },
];
