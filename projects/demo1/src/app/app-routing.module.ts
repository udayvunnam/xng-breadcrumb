import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerProductComponent } from './customer-product/customer-product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'customer-list',
        children: [
          {
            path: '',
            component: CustomerListComponent,
            data: { breadcrumb: 'klanten' }
          },
          {
            path: 'customer-details',
            data: { skipBreadcrumb: true },
            children: [
              {
                path: ':id',
                // data: { breadcrumb: 'customer-details/:id' },
                children: [
                  {
                    path: '',
                    component: CustomerDetailsComponent
                  },
                  {
                    path: 'customer-product',
                    data: { skipBreadcrumb: true },
                    children: [
                      {
                        path: ':id',
                        // data: { breadcrumb: 'customer-product/:id' },
                        children: [
                          {
                            path: '',
                            component: CustomerProductComponent
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
