import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbViewComponent } from './breadcrumb-view/breadcrumb-view.component';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent,
    BreadcrumbViewComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([]), BreadcrumbModule],
  exports: [PageNotFoundComponent, NavbarComponent, BreadcrumbViewComponent],
})
export class CoreModule {}
