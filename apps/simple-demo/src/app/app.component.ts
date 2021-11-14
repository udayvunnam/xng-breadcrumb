import { Component, VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(router: Router) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  name = 'Angular ' + VERSION.major;
}
