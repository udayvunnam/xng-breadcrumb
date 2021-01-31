import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Users' },
    children: [
      {
        path: 'add',
        component: UserRegistrationComponent,
        data: { breadcrumb: 'New' },
      },
      {
        path: 'edit',
        component: UserEditComponent,
        data: { breadcrumb: 'Edit' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
