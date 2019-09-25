import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { BreadcrumbService } from './breadcrumb.service';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BreadcrumbModule,
      providers: [BreadcrumbService]
    };
  }
}
