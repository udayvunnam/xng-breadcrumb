import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BreadcrumbModule} from "@xng/xng-breadcrumb"
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BreadcrumbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
