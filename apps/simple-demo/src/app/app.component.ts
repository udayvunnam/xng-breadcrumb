import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showBreadcrumbs = false;

  constructor(router: Router) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  toggleBreadcrumbVisibility() {
    this.showBreadcrumbs = !this.showBreadcrumbs;
  }

  name = 'Angular ' + VERSION.major;
}
