import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'xng-breadcrumb';

@Component({
  imports: [RouterModule, BreadcrumbComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `

:host {
  display: block;
  font-family: sans-serif;
  min-width: 300px;
  max-width: 600px;
  margin: 50px auto;
}

.gutter-left {
  margin-left: 9px;
}

.col-span-2 {
  grid-column: span 2;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

header {
  background-color: #143055;
  color: white;
  padding: 5px;
  border-radius: 3px;
}

main {
  padding: 0 36px;
}

p {
  text-align: center;
}

h1 {
  text-align: center;
  margin-left: 18px;
  font-size: 24px;
}

h2 {
  text-align: center;
  font-size: 20px;
  margin: 40px 0 10px 0;
}

.resources {
  text-align: center;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 9px;
  grid-template-columns: 1fr 1fr;
}

.resource {
  color: #0094ba;
  height: 36px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 3px 9px;
  text-decoration: none;
}

.resource:hover {
  background-color: rgba(68, 138, 255, 0.04);
}

pre {
  padding: 9px;
  border-radius: 4px;
  background-color: black;
  color: #eee;
}

details {
  border-radius: 4px;
  color: #333;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.12);
  padding: 3px 9px;
  margin-bottom: 9px;
}

summary {
  cursor: pointer;
  outline: none;
  height: 36px;
  line-height: 36px;
}

.github-star-container {
  margin-top: 12px;
  line-height: 20px;
}

.github-star-container a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.github-star-badge {
  color: #24292e;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 3px 10px;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 3px;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
  margin-left: 4px;
  font-weight: 600;
}

.github-star-badge:hover {
  background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
  border-color: rgba(27, 31, 35, 0.35);
  background-position: -0.5em;
}
.github-star-badge .material-icons {
  height: 16px;
  width: 16px;
  margin-right: 4px;
}
`,
})
export class AppComponent {
  title = 'Game Of Thrones';
}
