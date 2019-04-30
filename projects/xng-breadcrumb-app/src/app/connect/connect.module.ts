import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectRoutingModule } from './connect-routing.module';
import { ConnectComponent } from './connect/connect.component';

@NgModule({
  declarations: [ConnectComponent],
  imports: [
    CommonModule,
    ConnectRoutingModule
  ]
})
export class ConnectModule { }
