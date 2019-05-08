import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbStore: Breadcrumb[] = [];
  private breadcrumbs = new Subject<Breadcrumb[]>();
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor() {}

  setBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const { path, data } = route.routeConfig;
    // set label as path if a breadcrumb value is not provided.
    const label = data && (data.breadcrumb || this.initCap(path) || '');
    // In the routeConfig the complete path is not available, we iterate reciursively
    const routePrefix = `/${url}${path}`;

    if (path) {
      const breadcrumbMap = {
        label,
        route: routePrefix,
        routeAlias: data.routeAlias
      };

      const newBreadcrumbs = [...breadcrumbs, breadcrumbMap];
      if (route.firstChild) {
        return this.setBreadcrumb(route.firstChild, routePrefix, newBreadcrumbs);
      }
    } else {
      return this.setBreadcrumb(route.firstChild, routePrefix, breadcrumbs);
    }

    this.breadcrumbStore = breadcrumbs;
    this.breadcrumbs.next(this.breadcrumbStore);
  }

  initCap(str: string) {
    if (!str) {
      return;
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }

  // Either pass route regex path or route
  updateLabel(routeAlias: string, label: string) {
    const breadcrumbIndex = this.breadcrumbStore.findIndex(item => item.routeAlias === routeAlias);

    this.breadcrumbStore[breadcrumbIndex] = { ...this.breadcrumbStore[breadcrumbIndex], label };
  }
}
