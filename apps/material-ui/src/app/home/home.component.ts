import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureDemo {
  title: string;
  detail: string;
  routeLabel: string;
  route: string;
  note: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  readonly featureDemos: FeatureDemo[] = [
    {
      title: 'Auto labels from route config',
      detail: 'Routes with no explicit label still render readable breadcrumbs.',
      routeLabel: '/dashboard',
      route: '/dashboard',
      note: 'Zero-config behavior',
    },
    {
      title: 'Dynamic labels with BreadcrumbService.set()',
      detail: 'Mentor routes update labels from API data and aliases.',
      routeLabel: '/mentor/1',
      route: '/mentor/1',
      note: 'Path + alias updates',
    },
    {
      title: 'Function-based labels',
      detail: 'Mentee details uses function breadcrumbs (`Viewing {id} now`).',
      routeLabel: '/mentee/1',
      route: '/mentee/1',
      note: 'Route-aware labels',
    },
    {
      title: 'Disable and skip behavior',
      detail: 'Intermediate segments can be shown but not clickable, or hidden.',
      routeLabel: '/connect/connect-success',
      route: '/connect/connect-success',
      note: 'Control navigation depth',
    },
    {
      title: 'Query params and fragment handling',
      detail: 'Use navbar links and compare breadcrumb behaviors in the live patterns above.',
      routeLabel: '/mentor?viaNav=true&type=list#testFragment',
      route: '/mentor',
      note: 'Preserve or drop via inputs',
    },
    {
      title: 'Custom templates and separators',
      detail: 'Default demo ships multiple visual variants including icons and custom separators.',
      routeLabel: '/mentee/add',
      route: '/mentee/add',
      note: 'Rich rendering',
    },
  ];
}
