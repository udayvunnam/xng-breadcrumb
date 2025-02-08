import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';

import { MatAnchor, MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterModule, MatToolbar, MatAnchor, RouterLink, MatIconButton, MatTooltip, NgIf, MatIcon, MatIconAnchor],
    templateUrl: './navbar.component.html',
    styles: `
    .home {
      margin-right: 32px;
    }
  `
})
export class NavbarComponent {
  theme = 'light';
  @Output() themeChanged: EventEmitter<string> = new EventEmitter();

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.themeChanged.emit(this.theme);
  }
}
