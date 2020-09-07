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
    data: {
      breadcrumb: 'student',
    },
    component: MenteeComponent,
    children: [
      {
        path: 'add',
        component: MenteeAddComponent,
        data: { breadcrumb: 'New' },
      },
      {
        path: ':id',
        data: {
          breadcrumb: (id) => {
            return `Viewing ${id} now`;
          },
        },
        children: [
          {
            path: '',
            component: MenteeDetailsComponent,
          },
          {
            path: 'edit',
            component: MenteeEditComponent,
            data: {
              breadcrumb: {
                alias: 'menteeEdit',
              },
            },
          },
        ],
      },
      {
        path: '',
        component: MenteeListComponent,
        data: {
          breadcrumb: {
            disable: true,
          },
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenteeRoutingModule {}
export const MENTEE_ROUTE_COMPONENETS = [
  MenteeEditComponent,
  MenteeListComponent,
  MenteeDetailsComponent,
  MenteeAddComponent,
  MenteeComponent,
];
