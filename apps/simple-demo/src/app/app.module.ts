import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from '@xng/xng-breadcrumb';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { Page1Component } from './page1.component';
import { Page2Component } from './page2.component';
@NgModule({
  declarations: [AppComponent, Page1Component, Page2Component],
  imports: [BrowserModule, BreadcrumbModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
