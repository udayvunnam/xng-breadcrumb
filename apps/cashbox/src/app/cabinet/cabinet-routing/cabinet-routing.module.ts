import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from '../cabinet-layout/cabinet-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    data: { reuse: true, breadcrumb: 'Cabinet' },
    children: [
      {
        path: 'cashboxes',
        loadChildren: () =>
          import('../../../app/cashboxes/cashboxes.module').then(
            (m) => m.CashboxesModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../../app/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../../../app/organization/organization.module').then(
            (m) => m.OrganizationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
