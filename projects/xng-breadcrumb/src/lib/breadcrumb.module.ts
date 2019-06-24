import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { SkipBreadcrumbPipe } from './skip-breadcrumb.pipe';

@NgModule({
  declarations: [BreadcrumbComponent, SkipBreadcrumbPipe],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
