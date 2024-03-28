import { Route } from '@angular/router';
import { MentorAddComponent } from './mentor-add/mentor-add.component';
import { MentorDetailsComponent } from './mentor-details/mentor-details.component';
import { MentorEditComponent } from './mentor-edit/mentor-edit.component';
import { MentorListComponent } from './mentor-list/mentor-list.component';
import { MentorComponent } from './mentor/mentor.component';

export const MENTOR_ROUTES: Route[] = [
  {
    path: '',
    component: MentorComponent,
    children: [
      {
        path: 'add',
        component: MentorAddComponent,
      },
      {
        path: ':id',
        data: {
          breadcrumb: {
            disable: true,
          },
        },
        children: [
          {
            path: '',
            component: MentorDetailsComponent,
          },
          {
            path: 'edit',
            component: MentorEditComponent,
          },
        ],
      },
      {
        path: '',
        component: MentorListComponent,
      },
    ],
  },
];
