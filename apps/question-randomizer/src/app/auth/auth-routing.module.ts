import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanActivate, UnauthGuard } from '../core/_guards';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
        canActivate: [UnauthGuard],
      },
      {
        path: 'registration',
        loadComponent: () =>
          import('./registration/registration.component').then(
            (m) => m.RegistrationComponent
          ),
        canActivate: [UnauthGuard],
      },
      {
        path: 'email-confirm',
        loadComponent: () =>
          import('./email-confirm/email-confirm.component').then(
            (m) => m.EmailConfirmComponent
          ),
        canActivate: [AuthCanActivate],
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
