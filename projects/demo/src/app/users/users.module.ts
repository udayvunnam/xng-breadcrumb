import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [UsersComponent, AddUserComponent, ShowUserComponent, EditUserComponent],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
