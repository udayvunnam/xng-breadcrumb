import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent, data: { breadcrumb: 'My Users' } },
  { path: 'add', component: AddUserComponent, data: { breadcrumb: 'Add new' } },
  {
    path: ':userId',
    data: { breadcrumb: 'Self User' },
    children: [
      { path: '', component: ShowUserComponent },
      { path: 'edit', component: EditUserComponent, data: { breadcrumb: 'Edit user' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
