import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'xng-breadcrumb-app';
  darkMode = false;

  updateTheme(theme) {
    this.darkMode = theme === 'dark';
  }
}
