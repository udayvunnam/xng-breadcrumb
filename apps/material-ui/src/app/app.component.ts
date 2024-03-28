import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbViewComponent } from './core/breadcrumb-view/breadcrumb-view.component';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [RouterModule, BreadcrumbViewComponent, NavbarComponent, CommonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  darkMode = false;

  updateTheme(theme) {
    this.darkMode = theme === 'dark';
  }
}
