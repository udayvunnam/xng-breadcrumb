import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [BreadcrumbComponent, BreadcrumbItemDirective],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
