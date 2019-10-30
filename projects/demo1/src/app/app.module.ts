import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HomeComponent } from './home/home.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, CustomerListComponent, CustomerDetailsComponent, CustomerProductComponent],
  imports: [BrowserModule, AppRoutingModule, BreadcrumbModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
