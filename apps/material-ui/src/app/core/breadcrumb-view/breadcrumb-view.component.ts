import { Component } from '@angular/core';
import { CommonModule, NgIf, TitleCasePipe } from '@angular/common';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-breadcrumb-view',
  standalone: true,
  styleUrls: ['./breadcrumb-view.component.css'],
  templateUrl: './breadcrumb-view.component.html',
  imports: [CommonModule, BreadcrumbComponent, BreadcrumbItemDirective, MatIcon, NgIf, RouterOutlet, TitleCasePipe],
})
export class BreadcrumbViewComponent {}
