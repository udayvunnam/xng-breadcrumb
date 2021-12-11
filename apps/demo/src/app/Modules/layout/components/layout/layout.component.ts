import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    if (this.router.url === '/') {
      // assuming current user's role is designer.
      // then user is navigated to designer's dashboard.
      const role = 'Designer';
      if (role === 'Designer') {
        const isDesigner = true;
        this.breadcrumbService.set('', {
          routeInterceptor: (routeLink) =>
            isDesigner ? '/designer' : routeLink,
        });
        this.router.navigate(['/designer']);
      }
    }
  }
}
