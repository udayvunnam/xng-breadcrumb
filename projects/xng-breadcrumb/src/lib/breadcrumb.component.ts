import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'xng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    distinctUntilChanged(),
    map(event => this.setBreadcrumb(this.activatedRoute.root))
  );

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  setBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const path = route.routeConfig ? route.routeConfig.path : '';
    //set label as path if a breadcrumb value is not provided.
    let label = path || 'Home';
    if (route.routeConfig && route.routeConfig.data && route.routeConfig.data.breadcrumb) {
      label = route.routeConfig.data['breadcrumb'];
    }

    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label,
      route: nextUrl
    };
    const newBreadcrumbs = [...breadcrumbs, breadcrumb];
    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcumb
      return this.setBreadcrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
