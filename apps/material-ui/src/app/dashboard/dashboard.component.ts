import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule],
    templateUrl: './dashboard.component.html',
    styles: `
  blockquote {
  border-left: 5px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "";
}
blockquote:before {
  color: #ccc;
  content: open-quote;
  font-size: 3em;
  font-weight: 300;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  display: inline;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
}

links > * {
  cursor: pointer;
}

links > *:hover {
  background: #009688;
  color: white;
}
.home-container {
  margin: 16px 64px;
}

.links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
  `
})
export class DashboardComponent {}
