import { Route } from '@angular/router';
import { ConnectSuccessComponent } from './connect-success/connect-success.component';
import { ConnectComponent } from './connect/connect.component';

export const CONNECT_ROUTES: Route[] = [
  {
    path: '',
    component: ConnectComponent,
    data: {
      breadcrumb: {
        label: 'connect (child)',
        force: true,
      },
    },
    children: [
      {
        matcher: (url) => (url.length === 1 && url[0].path === 'connect-success' ? { consumed: url } : null),
        component: ConnectSuccessComponent,
        data: {
          breadcrumb: {
            label: 'Connect Success',
            force: true,
          },
        },
      },
    ],
  },
];
