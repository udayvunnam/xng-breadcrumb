import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  /**
   * breadcrumb label for base OR root path. Usually, this can be set as 'Home'
   */
  private baseBreadcrumb: Breadcrumb;

  private baseHref = '/';

  /**
   * dynamicBreadcrumbStore holds information about dynamically updated breadcrumbs.
   * Breadcrumbs can be set from anywhere (component, service) in the app.
   * On every breadcrumb update check this store and use the info if available.
   */
  private dynamicBreadcrumbStore: Breadcrumb[] = [];

  /**
   * breadcrumbList for the current route
   * When breadcrumb info is changed dynamically, check if the currentBreadcrumbs is effected
   * If effected, update the change and emit a new stream
   */
  private currentBreadcrumbs: Breadcrumb[] = [];

  /**
   * Breadcrumbs observable to be subscribed by BreadcrumbComponent
   * Emits on every route change OR dynamic update of breadcrumb
   */
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  public breadcrumbs$ = this.breadcrumbs.asObservable();

  private pathParamPrefix = ':';
  private pathParamRegexIdentifier = '/:[^/]+';
  private pathParamRegexReplacer = '/[^/]+';

  /**
   * If true, breacrumb is auto generated even without any mapping label
   * Default label is same as route segment
   */
  public defaultMapping = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.setBaseBreadcrumb();
    this.detectRouteChanges();
  }

  /**
   * Update breadcrumb label or options for -
   *
   * route (complete route path). route can be passed the same way you define angular routes
   * 1) update label Ex: set('/mentor', 'Mentor'), set('/mentor/:id', 'Mentor Details')
   * 2) change visibility Ex: set('/mentor/:id/edit', { skip: true })
   * 3) add info Ex: set('/mentor/:id/edit', { info: { icon: 'edit', iconColor: 'blue' } })
   * ------------------------ OR -------------------------
   *
   * alias (prefixed with '@'). breadcrumb alias is unique for a route
   * 1) update label Ex: set('@mentor', 'Enabler')
   * 2) change visibility Ex: set('@mentorEdit', { skip: true })
   * 3) add info Ex: set('@mentorEdit', { info: { icon: 'edit', iconColor: 'blue' } })
   */
  set(pathOrAlias: string, breadcrumb: string | Breadcrumb) {
    if (!this.validateArguments(pathOrAlias, breadcrumb)) {
      return;
    }

    if (typeof breadcrumb === 'string') {
      breadcrumb = {
        label: breadcrumb
      };
    }

    if (pathOrAlias.startsWith('@')) {
      this.updateStore({ ...breadcrumb, alias: pathOrAlias.slice(1) });
    } else {
      const breadcrumbExtraProps = this.buildRouteRegExp(pathOrAlias);
      this.updateStore({ ...breadcrumb, ...breadcrumbExtraProps });
    }
  }

  private setBaseBreadcrumb() {
    const baseConfig = this.router.config.find(pathConfig => pathConfig.path === '');
    if (baseConfig && baseConfig.data) {
      const { label, alias, skip = false, info } = this.getBreadcrumbOptions(baseConfig.data);

      this.baseBreadcrumb = {
        label,
        alias,
        skip,
        info,
        routeLink: this.baseHref
      };
    }
  }

  /**
   * Whenever route changes build breadcrumb list again
   */
  private detectRouteChanges() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => {
        this.currentBreadcrumbs = this.baseBreadcrumb ? [this.baseBreadcrumb] : [];
        this.prepareBreadcrumbList(this.activatedRoute.root, this.baseHref);
      });
  }

  private prepareBreadcrumbList(activatedRoute: ActivatedRoute, routeLinkPrefix: string): Breadcrumb[] {
    if (activatedRoute.routeConfig && activatedRoute.routeConfig.path) {
      const breadcrumbItem = this.prepareBreadcrumbItem(activatedRoute, routeLinkPrefix);
      this.currentBreadcrumbs.push(breadcrumbItem);

      if (activatedRoute.firstChild) {
        return this.prepareBreadcrumbList(activatedRoute.firstChild, breadcrumbItem.routeLink + '/');
      }
    } else if (activatedRoute.firstChild) {
      return this.prepareBreadcrumbList(activatedRoute.firstChild, routeLinkPrefix);
    }
    // remove breadcrumb items that needs to be hidden or don't have a label
    const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip);
    this.breadcrumbs.next(breacrumbsToShow);
  }

  private prepareBreadcrumbItem(activatedRoute: ActivatedRoute, routeLinkPrefix: string): Breadcrumb {
    const { path, breadcrumb } = this.parseRouteData(activatedRoute.routeConfig);

    // in case of path param get the resolved for param
    const resolvedPath = this.resolvePathParam(path, activatedRoute);
    const routeLink = `${routeLinkPrefix}${resolvedPath}`;

    let { label, alias, skip, info } = this.getFromStore(breadcrumb.alias, routeLink);

    if (typeof label !== 'string') {
      if (typeof breadcrumb.label === 'string') {
        label = breadcrumb.label;
      } else if (this.defaultMapping) {
        label = resolvedPath;
      }
    }

    return {
      label,
      alias: alias || breadcrumb.alias,
      skip: skip || breadcrumb.skip,
      info: info || breadcrumb.info,
      routeLink
    };
  }

  /**
   * For a specific route, breadcrumb can be defined either on parent data OR it's child(which has empty path) data
   * When both are defined, child takes precedence
   *
   * Ex: Below we are setting breadcrumb on both parent and child.
   * So, child takes precedence and "Defined On Child" is displayed for the route 'home'
   * { path: 'home', loadChildren: './home/home.module#HomeModule' , data: {breadcrumb: "Defined On Module"}}
   *                                                AND
   * children: [
   *   { path: '', component: ShowUserComponent, data: {breadcrumb: "Defined On Child" }
   * ]
   */
  private parseRouteData(routeConfig) {
    const { path, data = {} } = routeConfig;
    const breadcrumb = this.mergeWithBaseChildData(routeConfig, { ...data });

    return { path, breadcrumb };
  }

  private getFromStore(breadcrumbAlias: string, routeLink: string): Breadcrumb {
    let matchingItem;
    if (breadcrumbAlias) {
      matchingItem = this.dynamicBreadcrumbStore.find(item => item.alias === breadcrumbAlias);
    }

    if (!matchingItem && routeLink) {
      matchingItem = this.dynamicBreadcrumbStore.find(item => {
        return (item.routeLink && item.routeLink === routeLink) || (item.routeRegex && new RegExp(item.routeRegex).test(routeLink + '/'));
      });
    }

    return matchingItem || {};
  }

  /**
   * To update breadcrumb label for a route with path param, we need regex that matches route.
   * Instead of user providing regex, we help in preparing regex dynamically
   *
   * Ex: route declaration - path: '/mentor/:id'
   * breadcrumbService.set('/mentor/:id', 'Uday');
   * '/mentor/2' OR 'mentor/adasd' we should use 'Uday' as label
   *
   * regex string is built, if route has path params(contains with ':')
   */
  private buildRouteRegExp(path) {
    // ensure leading slash is provided in the path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (path.includes(this.pathParamPrefix)) {
      // replace mathing path param with a regex
      // '/mentor/:id' becomes '/mentor/[^/]', which further will be matched in updateStore
      const routeRegex = path.replace(new RegExp(this.pathParamRegexIdentifier, 'g'), this.pathParamRegexReplacer);
      return { routeRegex };
    } else {
      return { routeLink: path };
    }
  }

  /**
   * Update current breadcrumb definition and emit a new stream of breadcrumbs
   * Also update the store to reuse dynamic declarations
   */
  private updateStore(spec) {
    const { alias, routeLink, routeRegex, ...rest } = spec;

    let breadcrumbItemIndex;
    let storeItemIndex;

    // identify macthing breadcrumb and store item
    if (alias) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => alias === item.alias);
      storeItemIndex = this.dynamicBreadcrumbStore.findIndex(item => alias === item.alias);
    } else if (routeLink) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => routeLink === item.routeLink);
      storeItemIndex = this.dynamicBreadcrumbStore.findIndex(item => routeLink === item.routeLink);
    } else if (routeRegex) {
      breadcrumbItemIndex = this.currentBreadcrumbs.findIndex(item => new RegExp(routeRegex).test(item.routeLink + '/'));
      storeItemIndex = this.dynamicBreadcrumbStore.findIndex(item => routeRegex === item.routeRegex);
    }

    // if breadcrumb is present in current breadcrumbs update it and emit new stream
    if (breadcrumbItemIndex > -1) {
      this.currentBreadcrumbs[breadcrumbItemIndex] = { ...this.currentBreadcrumbs[breadcrumbItemIndex], ...rest };
      const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip);
      this.breadcrumbs.next([...breacrumbsToShow]);
    }

    // If the store already has this route definition update it, else add
    if (storeItemIndex > -1) {
      this.dynamicBreadcrumbStore[storeItemIndex] = { ...this.dynamicBreadcrumbStore[storeItemIndex], ...rest };
    } else {
      this.dynamicBreadcrumbStore.push({ alias, routeLink, routeRegex, ...rest });
    }
  }

  private resolvePathParam(path: string, activatedRoute: ActivatedRoute) {
    // if the path segment is a route param, read the param value from url
    if (path.startsWith(this.pathParamPrefix)) {
      return activatedRoute.snapshot.params[path.slice(1)];
    }
    return path;
  }

  /**
   * get empty children of a module or Component. Empty child is the one with path: ''
   * When parent and it's children (that has empty route path) define data
   * merge them both with child taking precedence
   */
  private mergeWithBaseChildData(routeConfig, data): Breadcrumb {
    if (!routeConfig) {
      return this.getBreadcrumbOptions(data);
    }

    let baseChild;
    if (routeConfig.loadChildren) {
      // To handle a module with empty child route
      baseChild = routeConfig._loadedConfig.routes.find(route => route.path === '');
    } else if (routeConfig.children) {
      // To handle a component with empty child route
      baseChild = routeConfig.children.find(route => route.path === '');
    }

    return baseChild && baseChild.data
      ? this.mergeWithBaseChildData(baseChild, {
          ...this.getBreadcrumbOptions(data),
          ...this.getBreadcrumbOptions(baseChild.data)
        })
      : this.getBreadcrumbOptions(data);
  }

  private validateArguments(pathOrAlias, breadcrumb) {
    if (pathOrAlias === null || pathOrAlias === undefined) {
      console.error('Invalid first argument. Please pass a route path or a breadcrumb alias.');
      return false;
    } else if (breadcrumb === null || breadcrumb === undefined) {
      console.error('Invalid second argument. Please pass a string or an Object with breadcrumb options.');
      return false;
    }
    return true;
  }

  /**
   * breadcrumb can be passed a label or an options object
   * If passed as a string convert to breadcrumb options object
   */
  private getBreadcrumbOptions(data) {
    let { breadcrumb } = data;
    if (typeof breadcrumb === 'string' || !breadcrumb) {
      breadcrumb = {
        label: breadcrumb
      };
    }
    return breadcrumb;
  }
}
