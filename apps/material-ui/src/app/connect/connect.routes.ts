import { Route } from '@angular/router';
import { ConnectSuccessComponent } from './connect-success/connect-success.component';
import { ConnectComponent } from './connect/connect.component';

export const CONNECT_ROUTES: Route[] = [
  {
    path: '',
    component: ConnectComponent,
  },
  {
    path: 'connect-success',
    component: ConnectSuccessComponent,
  },
];
