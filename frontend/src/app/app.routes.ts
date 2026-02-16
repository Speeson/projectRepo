import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginPageComponent } from './pages/login-page.component';
import { MyProjectsPageComponent } from './pages/my-projects-page.component';
import { PendingProjectsPageComponent } from './pages/pending-projects-page.component';
import { PublicProjectsPageComponent } from './pages/public-projects-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'public' },
  { path: 'login', component: LoginPageComponent },
  { path: 'public', component: PublicProjectsPageComponent },
  {
    path: 'my-projects',
    component: MyProjectsPageComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ALUMNO'] }
  },
  {
    path: 'pending',
    component: PendingProjectsPageComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['DOCENTE', 'ADMIN'] }
  },
  { path: '**', redirectTo: 'public' }
];
