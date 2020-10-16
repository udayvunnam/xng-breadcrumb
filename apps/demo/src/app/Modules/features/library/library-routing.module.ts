import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLibraryComponent } from './components/view-library/view-library.component';

const routes: Routes = [
  {
    path: '',
    component: ViewLibraryComponent,
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
