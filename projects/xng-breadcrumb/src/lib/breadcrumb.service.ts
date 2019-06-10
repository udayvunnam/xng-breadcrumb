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

  set(path: string | RegExp, label: string) {
    if (path instanceof RegExp) {
      console.log('In Regex');
    } else {
      console.log('In Regex');
    }
  }

  hide(path: string | RegExp) {
    if (path instanceof RegExp) {
      console.log('In Regex');
    } else {
      console.log('In Regex');
    }
  }

  setForAlias(path: string | RegExp, label: string) {}

  hideForAlias(path: string) {}

  setBreadcrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (route.routeConfig && route.routeConfig.path) {
      const { path, data } = route.routeConfig;
      const param = this.extractParam(route, path);

      // set label as path if a breadcrumb value is not provided.
      const label = (data && data.breadcrumb) || param || this.initCap(path) || '';

      const routeAlias = (data && data.routeAlias) || '';
      const routePrefix = `${url}/${param || path}`;

      const breadcrumbMap = {
        label,
        route: routePrefix,
        routeAlias
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

  /**
   * Either pass complete route path or route alias
   *
   * @param {string} routeAlias
   * @param {string} label
   * @memberof BreadcrumbService
   */
  private updateLabel(routeAlias: string, label: string) {
    const breadcrumbIndex = this.breadcrumbStore.findIndex(item => item.routeAlias === routeAlias);

    this.breadcrumbStore[breadcrumbIndex] = { ...this.breadcrumbStore[breadcrumbIndex], label };
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
