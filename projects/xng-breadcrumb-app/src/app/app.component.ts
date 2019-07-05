import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xng-breadcrumb-app';
  darkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    /*
     * Since we are generating random data using faker.js, id's won't same if app is refreshed
     * Navigate to homepage on browser refresh
     */
    // this.router.navigate(['']);
  }

  updateTheme(theme) {
    this.darkMode = theme === 'dark';
  }
}
