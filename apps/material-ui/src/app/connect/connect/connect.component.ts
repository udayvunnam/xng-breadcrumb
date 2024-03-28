import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [CommonModule, MatButton, RouterLink],
  templateUrl: './connect.component.html',
  styles: `
    .connect {
      display: flex;
      justify-content: center;
    }

    .connect button {
      width: 200px;
    }
`,
})
export class ConnectComponent {}
