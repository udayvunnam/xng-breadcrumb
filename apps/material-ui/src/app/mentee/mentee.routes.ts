import { Route } from '@angular/router';
import { MenteeAddComponent } from './mentee-add/mentee-add.component';
import { MenteeDetailsComponent } from './mentee-details/mentee-details.component';
import { MenteeEditComponent } from './mentee-edit/mentee-edit.component';
import { MenteeListComponent } from './mentee-list/mentee-list.component';
import { MenteeComponent } from './mentee/mentee.component';

export const MENTEE_ROUTES: Route[] = [
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
