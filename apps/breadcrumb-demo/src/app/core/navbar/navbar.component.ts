import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  theme = 'light';
  @Output() themeChanged: EventEmitter<string> = new EventEmitter();

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeChanged.emit(this.theme);
  }
}
