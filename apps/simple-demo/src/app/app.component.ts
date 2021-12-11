import { BreadcrumbService } from 'xng-breadcrumb';
import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showBreadcrumbs = false;

  constructor(router: Router, private breadcrumbService: BreadcrumbService) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  toggleBreadcrumbVisibility() {
    this.showBreadcrumbs = !this.showBreadcrumbs;
  }

  setOrderItemsLabel() {
    this.breadcrumbService.set('@orderItems', { label: 'My Order Items' });
  }

  name = 'Angular ' + VERSION.major;
}
