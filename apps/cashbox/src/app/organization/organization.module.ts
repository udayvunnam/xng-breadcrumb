import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationProfileComponent } from './organization-profile/organization-profile.component';
import { OrganizationInformationComponent } from './organization-information/organization-information.component';

@NgModule({
  declarations: [
    OrganizationProfileComponent,
    OrganizationInformationComponent,
  ],
  imports: [CommonModule],
})
export class OrganizationModule {}
