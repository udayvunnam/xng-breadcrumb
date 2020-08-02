import { NgModule } from '@angular/core';

import {
  MenteeRoutingModule,
  MENTEE_ROUTE_COMPONENETS,
} from './mentee-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MENTEE_ROUTE_COMPONENETS],
  imports: [SharedModule, MenteeRoutingModule],
})
export class MenteeModule {}
