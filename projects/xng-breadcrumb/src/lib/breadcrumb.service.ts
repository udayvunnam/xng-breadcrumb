import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  /**
   * breadcrumb for base path. Usually This can be set as 'Home'
   */
  private baseBreadcrumb: Breadcrumb;

  private baseHref = '/';
  /**
   * Store holds all dynamic breadcrumb updates, so that they can be resued across App routes
   * When breadcrumb is set in between any intermediate components, we use store data to power breadcrumbs
   * TO REVISIT
   */
  private store: Breadcrumb[] = [];

  /**
   * currentBreadcrumbs holds the current route's breadcrumb definition
   * This is updated whenever breadcrumbs are updated dynamically a new stream is emitted
   */
  private currentBreadcrumbs: Breadcrumb[] = [];

  /**
   * Breadcrumbs observable to be subscibed by component
   */
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  private pathParamPrefix = ':';
  private pathParamRegexIdentifier = '/:[^/]+';
  private pathParamRegexReplacer = '/[^/]+';

  /**
   * If true, breacrumb is formed even without any configuration
   * Default mapping is same as route path
   */
  public defaultMapping = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.setBaseBreadcrumb();
    this.detectRouteChanges();
  }

  /**
   * update a breadcrumb label by passing route
   * route is same as angular route definition for a route
   * Ex: /mentor or /mentor/:id/edit
   */
  set(route: string, label: string) {
    const storeItem = this.buildRouteRegex({ route, label });
    this.updateStore(storeItem);
  }

  /**
   * skip a breadcrumb visibility by passing route
   * Ex: skip('/mentor') or skip('/mentor/:id/edit')
   * If you need to make a hidden breadcrumb visible, pass optional second param as false
   * skip('/mentor/:id/edit', false)
   */
  skip(route: string, skip = true) {
    const storeItem = this.buildRouteRegex({ route, skip });
    this.updateStore(storeItem);
  }

  /**
   * update a breadcrumb label by passing breadcrumbAlias, that is defined during application routing
   * setForAlias('mentor', 'Enabler')
   */
  setForAlias(alias: string, label: string) {
    this.updateStore({ alias, label });
  }

  /**
   * update a breadcrumb visibilty by passing breadcrumbAlias, that is defined during application routing
   * skipForAlias('mentorEdit')
   * If you need to make a hidden breadcrumb visible, pass optional second param as false
   * skipForAlias('mentorEdit', false)
   */
  skipForAlias(alias: string, skipBreadcrumb = true) {
    this.updateStore({ alias, skipBreadcrumb });
  }

  private setBaseBreadcrumb() {
    const baseConfig = this.router.config.find(pathConfig => pathConfig.path === '');
    if (baseConfig && baseConfig.data) {
      const { breadcrumb, breadcrumbAlias, skipBreadcrumb = false } = baseConfig.data;

      this.baseBreadcrumb = {
        label: breadcrumb,
        route: this.baseHref,
        alias: breadcrumbAlias,
        skip: skipBreadcrumb
      };
    }
  }

  private detectRouteChanges() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => {
        this.currentBreadcrumbs = this.baseBreadcrumb ? [this.baseBreadcrumb] : [];
        this.setBreadcrumbs(this.activatedRoute.root, this.baseHref);
      });
  }

  private setBreadcrumbs(activatedRoute: ActivatedRoute, url: string): Breadcrumb[] {
    if (activatedRoute.routeConfig && activatedRoute.routeConfig.path) {
      const breadcrumbItem = this.prepareBreadcrumbItem(activatedRoute, url);
      this.currentBreadcrumbs.push(breadcrumbItem);

      if (activatedRoute.firstChild) {
        return this.setBreadcrumbs(activatedRoute.firstChild, breadcrumbItem.route + '/');
      }
    } else if (activatedRoute.firstChild) {
      return this.setBreadcrumbs(activatedRoute.firstChild, url);
    }

    const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip && breadcrumb.label);
    this.breadcrumbs.next(breacrumbsToShow);
  }

  private prepareBreadcrumbItem(activatedRoute: ActivatedRoute, url: string): Breadcrumb {
    const { path, breadcrumb, breadcrumbAlias, skipBreadcrumb } = this.parseRouteConfig(activatedRoute.routeConfig);

    const pathSegement = this.resolvePathSegment(path, activatedRoute);
    const route = `${url}${pathSegement}`;
    const label = this.getFromStore(breadcrumbAlias, route, 'label') || breadcrumb || (this.defaultMapping ? pathSegement : '');
    const skip = this.getFromStore(breadcrumbAlias, route, 'skip') || skipBreadcrumb;

    return { label, route, skip, alias: breadcrumbAlias };
  }

  /**
   * breadcrumbs can be declared either on module or its children with empty path
   * When both are defined child empty path takes precedence
   * { path: 'home', loadChildren: './home/home.module#HomeModule' , data: {breadcrumb: "Defined On Module"}}
   *                             ----OR----
   * children: [
      { path: '', component: ShowUserComponent, data: {breadcrumb: "Defined On Child" }
    ]
   */
  private parseRouteConfig(routeConfig) {
    const { path, data = {} } = routeConfig;
    let { breadcrumb, breadcrumbAlias, skipBreadcrumb = false } = data;

    // To handle a module with empty child route
    if (routeConfig.loadChildren) {
      const baseChild = routeConfig._loadedConfig.routes.find(route => route.path === '');
      const baseChildData = baseChild && baseChild.data;
      if (baseChildData) {
        breadcrumb = baseChildData.breadcrumb || breadcrumb;
        breadcrumbAlias = baseChildData.breadcrumbAlias || breadcrumbAlias;
        skipBreadcrumb = baseChildData.skipBreadcrumb || skipBreadcrumb;
      }
    }

    // To handle a component with empty child route
    if (routeConfig.children) {
      const baseChild = routeConfig.children.find(route => route.path === '');
      const baseChildData = baseChild && baseChild.data;
      if (baseChildData) {
        breadcrumb = baseChildData.breadcrumb || breadcrumb;
        breadcrumbAlias = baseChildData.breadcrumbAlias || breadcrumbAlias;
        skipBreadcrumb = baseChildData.skipBreadcrumb || skipBreadcrumb;
      }
    }

    return {
      breadcrumb,
      breadcrumbAlias,
      skipBreadcrumb,
      path
    };
  }

  private getFromStore(breadcrumbAlias: string, route: string, prop: string) {
    let matchingItem;
    if (breadcrumbAlias) {
      matchingItem = this.store.find(item => item.alias === breadcrumbAlias);
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
  private buildRouteRegex({ route, ...props }) {
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
    const { alias, route, routeRegex, ...prop } = spec;

    let breadcrumbItemIndex;
    let storeItemIndex;

    // identify macthing breadcrumb and store item
    if (alias) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => alias === item.alias);
      storeItemIndex = this.store.findIndex(item => alias === item.alias);
    } else if (route) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => route === item.route);
      storeItemIndex = this.store.findIndex(item => route === item.route);
    } else if (routeRegex) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => new RegExp(routeRegex).test(item.route + '/'));
      storeItemIndex = this.store.findIndex(item => routeRegex === item.routeRegex);
    }

    // if breadcrumb is present in current breadcrumbs update it and emit new stream
    if (breadcrumbItemIndex > -1) {
      this.currentBreadcrumbs[breadcrumbItemIndex] = { ...this.currentBreadcrumbs[breadcrumbItemIndex], ...prop };
      const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip && breadcrumb.label);
      this.breadcrumbs.next([...breacrumbsToShow]);
    }

    // If the store already has this route definition update it, else add
    if (storeItemIndex > -1) {
      this.store[storeItemIndex] = { ...this.store[storeItemIndex], ...prop };
    } else {
      this.store.push({ alias, route, routeRegex, ...prop });
    }
  }

  private resolvePathSegment(pathSegement: string, activatedRoute: ActivatedRoute) {
    // if the path segment is a route param, read the param value from url
    if (pathSegement.startsWith(this.pathParamPrefix)) {
      return activatedRoute.snapshot.params[pathSegement.slice(1)];
    }
    return pathSegement;
  }
}
