import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BreadcrumbModule, BreadcrumbService } from '@xng/xng-breadcrumb';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { PageComponent } from './page.component';
@NgModule({
  declarations: [AppComponent, PageComponent],
  imports: [BrowserModule, BreadcrumbModule, AppRoutingModule],
  providers: [BreadcrumbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
