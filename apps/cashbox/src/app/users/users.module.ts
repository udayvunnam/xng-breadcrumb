import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersRoutingModule } from './users-routing/users-routing.module';

@NgModule({
  declarations: [UserRegistrationComponent, UserEditComponent],
  imports: [UsersRoutingModule, CommonModule],
})
export class UsersModule {}
