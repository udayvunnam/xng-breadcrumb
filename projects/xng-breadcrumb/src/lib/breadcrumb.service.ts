import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbStore: Breadcrumb[] = [];
  private breadcrumbs = new Subject<Breadcrumb[]>();
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor() {}

  set(path: string | RegExp, label: string) {
    if (path instanceof RegExp) {
      console.log('In Regex');
    } else {
      console.log('In Regex');
    }
  }

  skip(path: string | RegExp) {
    if (path instanceof RegExp) {
      console.log('In Regex');
    } else {
      console.log('In Regex');
    }
  }

  setForAlias(breadcrumbAlias: string, label: string) {
    const breadcrumbIndex = this.breadcrumbStore.findIndex(item => item.breadcrumbAlias === breadcrumbAlias);
    this.breadcrumbStore[breadcrumbIndex] = { ...this.breadcrumbStore[breadcrumbIndex], label };
    this.breadcrumbs.next(this.breadcrumbStore);
  }

  skipForAlias(breadcrumbAlias: string) {
    const breadcrumbIndex = this.breadcrumbStore.findIndex(item => item.breadcrumbAlias === breadcrumbAlias);
    this.breadcrumbStore[breadcrumbIndex] = { ...this.breadcrumbStore[breadcrumbIndex], skip: true };
    this.breadcrumbs.next(this.breadcrumbStore);
  }

  setBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.routeConfig && route.routeConfig.path) {
      const { path, data } = route.routeConfig;
      const param = this.extractParam(route, path);

      // set label as path if a breadcrumb value is not provided.
      const label = (data && data.breadcrumb) || param || this.initCap(path) || '';

      const breadcrumbAlias = (data && data.breadcrumbAlias) || '';
      const skipBreadcrumb = (data && data.skipBreadcrumb) || false;
      const routePrefix = `${url}/${param || path}`;

      const breadcrumbMap = {
        label,
        breadcrumbAlias,
        route: routePrefix,
        skip: skipBreadcrumb
      };

      this.breadcrumbStore = [...breadcrumbs, breadcrumbMap];
      if (route.firstChild) {
        return this.setBreadcrumb(route.firstChild, routePrefix, this.breadcrumbStore);
      }
    } else if (route.firstChild) {
      return this.setBreadcrumb(route.firstChild, url, breadcrumbs);
    }

    this.breadcrumbs.next(this.breadcrumbStore);
  }

  private extractParam(route: ActivatedRoute, path: string) {
    let paramValue: string;
    if (path.startsWith(':')) {
      paramValue = route.snapshot.params[path.slice(1)];
    }
    return paramValue;
  }

  private initCap(str: string) {
    if (!str) {
      return;
    }
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}
