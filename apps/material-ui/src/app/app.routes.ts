import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
    data: {
      breadcrumb: {
        label: 'dashboard',
        info: 'dashboard',
      },
    },
  },
  {
    path: 'mentor',
    loadChildren: () => import('./mentor/mentor.routes').then((m) => m.MENTOR_ROUTES),
    data: {
      breadcrumb: {
        info: 'person',
      },
    },
  },
  {
    path: 'mentee',
    loadChildren: () => import('./mentee/mentee.routes').then((m) => m.MENTEE_ROUTES),
    data: {
      breadcrumb: {
        info: 'person_outline',
        label: 'Mentee (Root)',
      },
    },
  },
  {
    path: 'connect',
    loadChildren: () => import('./connect/connect.routes').then((m) => m.CONNECT_ROUTES),
    data: {
      breadcrumb: {
        disable: true,
      },
    },
  },
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
      },
    },
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
