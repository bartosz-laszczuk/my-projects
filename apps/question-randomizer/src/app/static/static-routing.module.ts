import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        loadComponent: () =>
          import('./not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaticRoutingModule {}
