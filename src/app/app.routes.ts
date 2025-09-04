import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { CryptoDashboardComponent } from './components/crypto-dashboard/crypto-dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { CVComponent } from './components/cv/cv.component';


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
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'cv',
    component: CVComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];
