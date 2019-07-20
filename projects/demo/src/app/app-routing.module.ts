import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UserComponent, data: { breadcrumb: 'Users' } },
  { path: 'add', component: AddUserComponent, data: { breadcrumb: 'Add new' } },
  {
    path: ':userId',
    data: {
      breadcrumbAlias: 'username'
    },
    children: [
      {
        path: '',
        component: ShowUserComponent,
        data: { breadcrumbAlias: 'userFullname' }
      },
      {
        path: 'edit',
        component: EditUserComponent,
        data: { breadcrumbAlias: 'userFullname', breadcrumb: 'Edit' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
