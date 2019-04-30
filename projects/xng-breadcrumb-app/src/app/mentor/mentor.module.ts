import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule, MENTOR_ROUTE_COMPONENETS } from './mentor-routing.module';


@NgModule({
  declarations: [MENTOR_ROUTE_COMPONENETS],
  imports: [
    CommonModule,
    MentorRoutingModule
  ]
})
export class MentorModule { }
