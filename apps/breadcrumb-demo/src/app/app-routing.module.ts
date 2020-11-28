import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { HomeComponent } from './home/home.component';

// when deafalt route has no path or breadcrumb diplay home
export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'my home',
        info: 'home',
        routeInterceptor: (routeLink) => {
          console.log(routeLink);
          return routeLink;
        },
      },
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      breadcrumb: {
        label: 'dashboard',
        info: 'dashboard',
      },
    },
  },
  {
    path: 'mentor',
    loadChildren: () =>
      import('./mentor/mentor.module').then((m) => m.MentorModule),
    data: {
      breadcrumb: {
        info: 'person',
      },
    },
  },
  {
    path: 'mentee',
    loadChildren: () =>
      import('./mentee/mentee.module').then((m) => m.MenteeModule),
    data: {
      breadcrumb: {
        info: 'person_outline',
        label: 'Mentee (Root)',
      },
    },
  },
  {
    path: 'connect',
    loadChildren: () =>
      import('./connect/connect.module').then((m) => m.ConnectModule),
    data: {
      breadcrumb: {
        disable: true,
      },
    },
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
