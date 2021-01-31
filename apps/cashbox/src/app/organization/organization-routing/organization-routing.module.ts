import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationProfileComponent } from '../organization-profile/organization-profile.component';
import { OrganizationInformationComponent } from '../organization-information/organization-information.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Organization' },
    children: [
      {
        path: 'profile',
        component: OrganizationProfileComponent,
        data: { breadcrumb: 'Profile' },
      },
      {
        path: 'information',
        component: OrganizationInformationComponent,
        data: { breadcrumb: 'Information' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
