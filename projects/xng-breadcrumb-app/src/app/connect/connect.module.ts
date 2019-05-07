import { NgModule } from '@angular/core';

import { ConnectRoutingModule } from './connect-routing.module';
import { ConnectComponent } from './connect/connect.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ConnectComponent],
  imports: [SharedModule, ConnectRoutingModule]
})
export class ConnectModule {}
