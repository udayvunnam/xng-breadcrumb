import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetLayoutComponent } from './cabinet-layout/cabinet-layout.component';
import { CabinetRoutingModule } from './cabinet-routing/cabinet-routing.module';
import { BreadcrumbModule } from '@xng/xng-breadcrumb';

@NgModule({
  declarations: [CabinetLayoutComponent],
  imports: [CommonModule, CabinetRoutingModule, BreadcrumbModule],
})
export class CabinetModule {}
