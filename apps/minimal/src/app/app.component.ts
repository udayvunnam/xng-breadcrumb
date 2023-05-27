import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styles: [''],
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
