import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  standalone: true,
  imports: [RouterLink],
})
export class PageComponent {}
