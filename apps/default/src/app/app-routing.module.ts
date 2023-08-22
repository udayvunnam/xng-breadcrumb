import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found.component';
import { HomeComponent } from './home/home.component';

// when default route has no path or breadcrumb display home
export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      breadcrumb: {
        label: 'app',
        info: 'home',
        routeInterceptor: (routeLink) => {
          return routeLink;
        },
        staticQueryParams: {
          fromBreadcrumb: true,
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
        staticQueryParams: {
          fromBreadcrumb: true,
        },
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
        staticQueryParams: {
          fromBreadcrumb: true,
        },
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
        staticQueryParams: {
          fromBreadcrumb: true,
        },
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
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
