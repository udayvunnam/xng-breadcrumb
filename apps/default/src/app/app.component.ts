import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'xng-breadcrumb-app';
  darkMode = false;

  constructor(private router: Router) {}

  updateTheme(theme) {
    this.darkMode = theme === 'dark';
  }

  handleRoute(link) {
    console.log(link);
    return link;
  }
}
