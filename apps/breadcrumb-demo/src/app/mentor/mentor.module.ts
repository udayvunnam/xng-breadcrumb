import { NgModule } from '@angular/core';

import {
  MentorRoutingModule,
  MENTOR_ROUTE_COMPONENETS,
} from './mentor-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MENTOR_ROUTE_COMPONENETS],
  imports: [SharedModule, MentorRoutingModule],
})
export class MentorModule {}
