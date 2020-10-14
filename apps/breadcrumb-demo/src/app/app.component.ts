import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'bd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'xng-breadcrumb-app';
  darkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  updateTheme(theme) {
    this.darkMode = theme === 'dark';
  }

  handleRoute(link) {
    console.log(link);
    return link;
  }
}
