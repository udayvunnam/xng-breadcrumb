import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'projects/xng-breadcrumb/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [BrowserModule, AppRoutingModule, BreadcrumbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
