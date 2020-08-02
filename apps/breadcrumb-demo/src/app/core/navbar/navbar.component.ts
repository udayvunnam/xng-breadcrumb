import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'bd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  theme = 'light';
  @Output() themeChanged: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeChanged.emit(this.theme);
  }
}
