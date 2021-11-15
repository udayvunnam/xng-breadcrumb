import { PageComponent } from './page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: PageComponent,
    data: {
      breadcrumb: 'Dashboard',
    },
  },
  {
    path: 'company',
    data: { breadcrumb: 'Companies' },
    children: [
      { path: '', component: PageComponent },
      {
        path: ':companyId',
        data: { breadcrumb: 'Company Name' },
        children: [
          { path: '', component: PageComponent },
          {
            path: 'order',
            data: { breadcrumb: 'Orders' },
            children: [
              { path: '', component: PageComponent },
              {
                path: ':orderId',
                data: { breadcrumb: 'Order Details' },
                children: [
                  { path: '', component: PageComponent },
                  {
                    path: 'items',
                    component: PageComponent,
                    data: {
                      breadcrumb: {
                        alias: 'orderItems',
                      },
                    },
                  },
                  {
                    path: 'payment',
                    component: PageComponent,
                    data: { breadcrumb: 'Payment Info' },
                  },
                  {
                    path: 'delivery',
                    component: PageComponent,
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
