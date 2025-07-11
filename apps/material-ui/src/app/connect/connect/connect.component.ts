import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-connect',
    imports: [MatButton, RouterLink],
    templateUrl: './connect.component.html',
    styles: `
    .connect {
      display: flex;
      justify-content: center;
    }

    .connect button {
      width: 200px;
    }
`
})
export class ConnectComponent {}
