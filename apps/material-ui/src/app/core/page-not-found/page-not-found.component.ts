import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-page-not-found',
    imports: [CommonModule],
    template: ` <h2>404: Not found</h2>
    <p>Hey! It looks like the page doesn't exist yet.</p>
    <button mat-raised-button color="primary" routerLink="/">Take me Home</button>`,
    styles: `:host {
        text-align: center;
      }`
})
export class PageNotFoundComponent {}
