import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// when deafalt route has no path or breadcrumb diplay home
const appRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: 'mentor', loadChildren: './mentor/mentor.module#MentorModule' },
  { path: 'mentee', loadChildren: './mentee/mentee.module#MenteeModule' },
  { path: 'connect', loadChildren: './connect/connect.module#ConnectModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
