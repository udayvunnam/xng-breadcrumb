import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenteeRoutingModule, MENTEE_ROUTE_COMPONENETS } from './mentee-routing.module';

@NgModule({
  declarations: [MENTEE_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    MenteeRoutingModule
  ]
})
export class MenteeModule { }
