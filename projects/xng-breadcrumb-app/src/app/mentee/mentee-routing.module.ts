import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenteeComponent } from './mentee/mentee.component';
import { MenteeAddComponent } from './mentee-add/mentee-add.component';
import { MenteeDetailsComponent } from './mentee-details/mentee-details.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenteeComponent,
    children: [
      {
        path: 'add',
        component: MenteeAddComponent,
        data: { breadcrumb: 'New' }
      },
      {
        path: ':id',
        data: {
          breadcrumbAlias: 'menteeName'
        },
        children: [
          {
            path: '',
            component: MenteeDetailsComponent
          },
          {
            path: 'edit',
            component: MenteeEditComponent,
            data: { breadcrumbAlias: 'menteeEdit' }
          }
        ]
      },
      {
        path: '',
        component: MenteeListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenteeRoutingModule {}
export const MENTEE_ROUTE_COMPONENETS = [
  MenteeEditComponent,
  MenteeListComponent,
  MenteeDetailsComponent,
  MenteeAddComponent,
  MenteeComponent
];
