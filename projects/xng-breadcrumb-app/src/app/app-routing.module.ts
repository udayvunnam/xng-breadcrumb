import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';

// when deafalt route has no path or breadcrumb diplay home
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    data: {
      breadcrumb: 'My Home'
    }
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
      breadcrumb: 'Mentor'
    }
  },
  {
    path: 'mentee',
    loadChildren: './mentee/mentee.module#MenteeModule',
    data: {
      breadcrumb: 'Mentee'
    }
  },
  {
    path: 'connect',
    loadChildren: './connect/connect.module#ConnectModule',
    data: {
      breadcrumb: 'Connect'
    }
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
