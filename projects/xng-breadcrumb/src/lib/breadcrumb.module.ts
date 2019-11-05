import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbComponent } from './breadcrumb.component';
import { AutoLabelPipe } from './auto-label.pipe';

@NgModule({
  declarations: [BreadcrumbComponent, BreadcrumbItemDirective, AutoLabelPipe],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent, BreadcrumbItemDirective]
})
export class BreadcrumbModule {}
