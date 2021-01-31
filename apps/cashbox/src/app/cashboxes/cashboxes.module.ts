import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxesListComponent } from './cashboxes-list/cashboxes-list.component';
import { CashboxRegistrationComponent } from './cashbox-registration/cashbox-registration.component';
import { CashboxesRoutingModule } from './cashboxes-routing/cashboxes-routing.module';

@NgModule({
  declarations: [CashboxesListComponent, CashboxRegistrationComponent],
  imports: [CashboxesRoutingModule, CommonModule],
})
export class CashboxesModule {}
