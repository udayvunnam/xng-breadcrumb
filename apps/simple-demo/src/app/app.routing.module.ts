import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'page1',
    pathMatch: 'full',
  },
  {
    path: 'page1',
    component: Page1Component,
    data: {
      breadcrumb: 'FirstPage',
    },
  },
  {
    path: 'page2',
    component: Page2Component,
    data: {
      breadcrumb: 'Next Page',
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
