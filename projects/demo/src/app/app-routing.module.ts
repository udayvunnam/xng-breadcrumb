import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: { breadcrumb: 'My app name' },
    children: [
      { path: 'home', loadChildren: './home/home.module#HomeModule', data: { breadcrumb: 'Dashboard' } },
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: '**', redirectTo: '/home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
