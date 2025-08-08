import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';

export const routes: Routes = [
  {
    path: 'project/:slug',
    component: ProjectDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
