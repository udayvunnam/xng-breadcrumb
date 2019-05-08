import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorComponent } from './mentor/mentor.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { MentorAddComponent } from './mentor-add/mentor-add.component';

const routes: Routes = [
  {
    path: '',
    component: MentorComponent,
    children: [
      {
        path: 'add',
        component: MentorAddComponent,
        data: {
          breadcrumb: 'New'
        }
      },
      {
        path: ':id',
        component: MentorDetailsComponent,
        data: {
          routeAlias: 'mentorName'
        }
      },
      {
        path: '',
        component: MentorListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorRoutingModule {}
export const MENTOR_ROUTE_COMPONENETS = [MentorListComponent, MentorDetailsComponent, MentorAddComponent, MentorComponent];
