import { NgModule } from '@angular/core';

import {
  ConnectRoutingModule,
  CONNECT_ROUTE_COMPONENTS,
} from './connect-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CONNECT_ROUTE_COMPONENTS],
  imports: [SharedModule, ConnectRoutingModule],
})
export class ConnectModule {}
