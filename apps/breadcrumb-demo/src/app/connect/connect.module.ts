import { NgModule } from '@angular/core';

import {
  ConnectRoutingModule,
  CONNECT_ROUTE_COMPONENETS,
} from './connect-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CONNECT_ROUTE_COMPONENETS],
  imports: [SharedModule, ConnectRoutingModule],
})
export class ConnectModule {}
