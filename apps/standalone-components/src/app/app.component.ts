import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'xng-root',
  template: `<h1>Welcome standalone-components</h1>
    <router-outlet></router-outlet>`,
  styles: [''],
})
export class AppComponent {}
