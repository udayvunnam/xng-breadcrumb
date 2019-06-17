import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';

// when deafalt route has no path or breadcrumb diplay home
export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'mentor',
    loadChildren: './mentor/mentor.module#MentorModule',
    data: {
      breadcrumb: 'Mentors'
    }
  },
  {
    path: 'mentee',
    loadChildren: './mentee/mentee.module#MenteeModule'
  },
  {
    path: 'connect',
    loadChildren: './connect/connect.module#ConnectModule',
    data: {
      breadcrumb: 'Assign'
    }
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
