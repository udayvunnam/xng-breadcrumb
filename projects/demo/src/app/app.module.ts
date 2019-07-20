import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BreadcrumbModule } from 'projects/xng-breadcrumb/src/public-api';

@NgModule({
  declarations: [AppComponent, UserComponent, AddUserComponent, ShowUserComponent, EditUserComponent],
  imports: [BrowserModule, AppRoutingModule, BreadcrumbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
