import { Component } from '@angular/core';

@Component({
  selector: 'bd-page-not-found',
  template: `
    <h2>404: Not found</h2>
    <p>Hey! It looks like the page doesn't exist yet.</p>
    <button mat-raised-button color="primary" routerLink="/">
      Take me Home
    </button>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class PageNotFoundComponent {}
