import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { CryptoDashboardComponent } from './components/crypto-dashboard/crypto-dashboard.component';

export const routes: Routes = [
  {
    path: 'project/:slug',
    component: ProjectDetailComponent
  },
  {
    path: 'crypto-dashboard',
    component: CryptoDashboardComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
