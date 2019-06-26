import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { Subject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  // store holds all dynamic breadcrumb declarations so they can be resued across App routes
  private store: Breadcrumb[] = [];

  // currentBreadcrumbs holds the current breadcrumb definition
  // This is updated when breadcrumbs are changed dynamically and new stream is emitted
  private currentBreadcrumbs: Breadcrumb[] = [];

  private breadcrumbs = new Subject<Breadcrumb[]>();
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  private pathParamPrefix = ':';
  private pathParamRegexIdentifier = '/:[^/]+';
  private pathParamRegexReplacer = '/[^/]+';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => this.setBreadcrumb(this.activatedRoute.root));
  }

  /**
   * update a breadcrumb label by passing route
   * route is same as angular route definition for a route
   * Ex: /mentor or /mentor/:id/edit
   */
  set(route: string, label: string) {
    const storeItem = this.getRegexStoreItem({ route, label });
    this.updateStore(storeItem);
  }

  /**
   * skip a breadcrumb visibility by passing route
   * Ex: skip('/mentor') or skip('/mentor/:id/edit')
   * If you need to make a hidden breadcrumb visible, pass optional second param as false
   * skip('/mentor/:id/edit', false)
   */
  skip(route: string, skip = true) {
    const storeItem = this.getRegexStoreItem({ route, skip });
    this.updateStore(storeItem);
  }

  /**
   * update a breadcrumb label by passing breadcrumbAlias, that is defined during application routing
   * setForAlias('mentor', 'Enabler')
   */
  setForAlias(breadcrumbAlias: string, label: string) {
    this.updateStore({ breadcrumbAlias, label });
  }

  /**
   * update a breadcrumb visibilty by passing breadcrumbAlias, that is defined during application routing
   * skipForAlias('mentorEdit')
   * If you need to make a hidden breadcrumb visible, pass optional second param as false
   * skipForAlias('mentorEdit', false)
   */
  skipForAlias(breadcrumbAlias: string, skip = true) {
    this.updateStore({ breadcrumbAlias, skip });
  }

  private setBreadcrumb(activatedRoute: ActivatedRoute, url = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    if (activatedRoute.routeConfig && activatedRoute.routeConfig.path) {
      const breadcrumbItem = this.getBreadcrumbDefinition(activatedRoute, url);
      this.currentBreadcrumbs = [...breadcrumbs, breadcrumbItem];

      if (activatedRoute.firstChild) {
        return this.setBreadcrumb(activatedRoute.firstChild, breadcrumbItem.route, this.currentBreadcrumbs);
      }
    } else if (activatedRoute.firstChild) {
      return this.setBreadcrumb(activatedRoute.firstChild, url, breadcrumbs);
    }

    this.breadcrumbs.next(this.currentBreadcrumbs);
  }

  private getBreadcrumbDefinition(activatedRoute: ActivatedRoute, url = ''): Breadcrumb {
    const { path, data = {} } = activatedRoute.routeConfig;
    const { breadcrumb, breadcrumbAlias, skipBreadcrumb = false } = data;
    const pathSegement = this.resolvePath(path, activatedRoute);

    const route = `${url}/${pathSegement}`;
    const skip = this.getFromStore(breadcrumbAlias, route, 'skip') || skipBreadcrumb;
    // label is same as path if a breadcrumb value is not provided.
    const label = this.getFromStore(breadcrumbAlias, route, 'label') || breadcrumb || pathSegement;

    return { label, route, skip, breadcrumbAlias };
  }

  private getFromStore(breadcrumbAlias: string, route: string, prop: string) {
    let matchingItem;
    if (breadcrumbAlias) {
      matchingItem = this.store.find(item => item.breadcrumbAlias === breadcrumbAlias);
    }

    if (!matchingItem && route) {
      matchingItem = this.store.find(item => {
        return (item.route && item.route === route) || (item.routeRegex && new RegExp(item.routeRegex).test(route + '/'));
      });
    }

    if (matchingItem) {
      return matchingItem[prop];
    }

    return;
  }

  /**
   * regex string is built, if route has path params(contains with ':')
   */
  private getRegexStoreItem({ route, ...props }) {
    // ensure leading slash is provided in the path
    if (!route.startsWith('/')) {
      route = '/' + route;
    }

    if (route.includes(this.pathParamPrefix)) {
      const routeRegex = route.replace(new RegExp(this.pathParamRegexIdentifier, 'g'), this.pathParamRegexReplacer);
      return { routeRegex, ...props };
    } else {
      return { route, ...props };
    }
  }

  /**
   * Update current breadcrumb definition and emit a new stream of breadcrumbs
   * Also update the store to reuse dynamic declarations
   */
  private updateStore(spec) {
    const { breadcrumbAlias, route, routeRegex, ...prop } = spec;

    let breadcrumbItemIndex;
    let storeItemIndex;

    // identify macthing breadcrumb and store item
    if (breadcrumbAlias) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => breadcrumbAlias === item.breadcrumbAlias);
      storeItemIndex = this.store.findIndex(item => breadcrumbAlias === item.breadcrumbAlias);
    } else if (route) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => route === item.route);
      storeItemIndex = this.store.findIndex(item => route === item.route);
    } else if (routeRegex) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => new RegExp(routeRegex).test(item.route + '/'));
      storeItemIndex = this.store.findIndex(item => routeRegex === item.routeRegex);
    }

    // if breadcrum is present in current breadcrumbs update it and emit new stream
    if (breadcrumbItemIndex > -1) {
      this.currentBreadcrumbs[breadcrumbItemIndex] = { ...this.currentBreadcrumbs[breadcrumbItemIndex], ...prop };
      this.breadcrumbs.next([...this.currentBreadcrumbs]);
    }

    // If the store already has this route definition update it, else add
    if (storeItemIndex > -1) {
      this.store[storeItemIndex] = { ...this.store[storeItemIndex], ...prop };
    } else {
      this.store.push({ breadcrumbAlias, route, routeRegex, ...prop });
    }
  }

  private resolvePath(pathSegement: string, activatedRoute: ActivatedRoute) {
    if (pathSegement.startsWith(this.pathParamPrefix)) {
      return activatedRoute.snapshot.params[pathSegement.slice(1)];
    }
    return pathSegement;
  }
}
