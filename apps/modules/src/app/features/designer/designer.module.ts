import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerDashboardComponent } from './components/designer-dashboard/designer-dashboard.component';
import { DesignerDashboardRoutingModule } from './designer-routing.module';

@NgModule({
  declarations: [DesignerDashboardComponent],
  imports: [CommonModule, DesignerDashboardRoutingModule],
})
export class DesignerModule {}
