import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignerDashboardComponent } from './components/designer-dashboard/designer-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DesignerDashboardComponent,
    data: { breadcrumb: { skip: true } },
  },

  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignerDashboardRoutingModule {}
