import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { ConnectSuccessComponent } from './connect-success/connect-success.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectComponent,
  },
  {
    path: 'connect-success',
    component: ConnectSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectRoutingModule {}
export const CONNECT_ROUTE_COMPONENETS = [
  ConnectComponent,
  ConnectSuccessComponent,
];
