import { Route } from '@angular/router';
import { PageComponent } from './page/page.component';

export const appRoutes: Route[] = [
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
