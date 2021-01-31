import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashboxRegistrationComponent } from '../cashbox-registration/cashbox-registration.component';
import { CashboxesListComponent } from '../cashboxes-list/cashboxes-list.component';

const routes: Routes = [
  {
    path: '',
    data: { reuse: true, breadcrumb: 'Cashboxes' },
    children: [
      {
        path: 'list',
        component: CashboxesListComponent,
        data: { breadcrumb: 'Your Cashboxes' },
      },
      {
        path: 'new',
        component: CashboxRegistrationComponent,
        data: { breadcrumb: 'New' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashboxesRoutingModule {}
