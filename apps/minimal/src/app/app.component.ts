import { Component, inject, VERSION } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  imports: [RouterModule, BreadcrumbComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent {
  showBreadcrumbs = false;

  private readonly router = inject(Router);
  private readonly breadcrumbService = inject(BreadcrumbService);

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  toggleBreadcrumbVisibility() {
    this.showBreadcrumbs = !this.showBreadcrumbs;
  }

  setOrderItemsLabel() {
    this.breadcrumbService.set('@orderItems', { label: 'My Order Items' });
  }

  name = 'Angular ' + VERSION.major;
}
