import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGuard } from './page-guard.service';
import { Page1Component } from './page1.component';
import { Page2ChildComponent } from './page2-child.component';
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
      breadcrumb: 'Page 1',
    },
  },
  {
    path: 'page2',
    component: Page2Component,
    data: {
      breadcrumb: 'Page 2',
    },
    children: [
      {
        path: 'page2-child',
        component: Page2ChildComponent,
        data: {
          breadcrumb: 'Page2 child',
        },
        canDeactivate: [PageGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
