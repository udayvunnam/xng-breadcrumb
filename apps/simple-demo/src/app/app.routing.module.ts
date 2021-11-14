import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: AppComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'company',
    data: { breadcrumb: 'Companies' },
    children: [
      { path: '', component: AppComponent },
      {
        path: ':companyId',
        data: { breadcrumb: 'Company Name' },
        children: [
          { path: '', component: AppComponent },
          {
            path: 'order',
            data: { breadcrumb: 'Orders' },
            children: [
              { path: '', component: AppComponent },
              {
                path: ':orderId',
                data: { breadcrumb: 'Order Details' },
                children: [
                  { path: '', component: AppComponent },
                  {
                    path: 'items',
                    component: AppComponent,
                    data: { breadcrumb: 'Items' },
                  },
                  {
                    path: 'payment',
                    component: AppComponent,
                    data: { breadcrumb: 'Payment Info' },
                  },
                  {
                    path: 'delivery',
                    component: AppComponent,
                    data: { breadcrumb: 'Delivery Details' },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
