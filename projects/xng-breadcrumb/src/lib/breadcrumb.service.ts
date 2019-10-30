import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbData } from './breadcrumb-data';

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
   * If true, breacrumb is formed even without defining any mapping labels
   * breadcrumb label will be same as route path segment
   */
  public defaultMapping = true;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.setBaseBreadcrumb();
    this.detectRouteChanges();
  }

  /**
   * update breadcrumb label for a route (complete route path)
   * route can be passed the same way you define angular routes
   *
   * Ex: set('/mentor', 'Mentor') OR set('/mentor/:id/edit', 'Update Mentor')
   */
  set(path: string, label: string) {
    const storeItem = this.buildRouteRegExp({ path, label });
    this.updateStore(storeItem);
  }

  /**
   * hide breadcrumb for a specific route
   * Ex: skip('/mentor') OR skip('/mentor/:id/edit')
   *
   * If you need to make a hidden breadcrumb visible, pass second param as false
   * Ex: skip('/mentor/:id/edit', false)
   */
  skip(path: string, skip = true) {
    const storeItem = this.buildRouteRegExp({ path, skip });
    this.updateStore(storeItem);
  }

  /**
   * update breadcrumb label for a breadcrumbAlias
   * breadcrumbAlias is unique for a route and is defined during application routes
   *
   * Ex: setForAlias('mentor', 'Enabler')
   */
  setForAlias(alias: string, label: string) {
    this.updateStore({ alias, label });
  }

  /**
   * hide breadcrumb for a specific route
   * Ex: skipForAlias('mentorEdit')
   *
   * If you need to make a hidden breadcrumb visible, pass second param as false
   * Ex: skipForAlias('mentorEdit', false)
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
        routeLink: this.baseHref,
        alias: breadcrumbAlias,
        skip: skipBreadcrumb
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
    const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip && breadcrumb.label);
    this.breadcrumbs.next(breacrumbsToShow);
  }

  private prepareBreadcrumbItem(activatedRoute: ActivatedRoute, routeLinkPrefix: string): Breadcrumb {
    const { path, breadcrumb, breadcrumbAlias, skipBreadcrumb } = this.parseRouteData(activatedRoute.routeConfig);

    // in case of path param get the resolved for param
    const resolvedPath = this.resolvePathParam(path, activatedRoute);

    const routeLink = `${routeLinkPrefix}${resolvedPath}`;
    const label = this.getFromStore(breadcrumbAlias, routeLink, 'label') || breadcrumb || (this.defaultMapping ? resolvedPath : '');
    const skip = this.getFromStore(breadcrumbAlias, routeLink, 'skip') || skipBreadcrumb;

    return { label, routeLink, skip, alias: breadcrumbAlias };
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
    let { path, data = {} } = routeConfig;
    const baseChildData = this.getImmediateBaseChildData(routeConfig);
    if (baseChildData) {
      data = this.mergeParentWithChild(data, baseChildData);
    }

    return { path, ...data };
  }

  private getFromStore(breadcrumbAlias: string, routeLink: string, prop: string) {
    let matchingItem;
    if (breadcrumbAlias) {
      matchingItem = this.dynamicBreadcrumbStore.find(item => item.alias === breadcrumbAlias);
    }

    if (!matchingItem && routeLink) {
      matchingItem = this.dynamicBreadcrumbStore.find(item => {
        return (item.routeLink && item.routeLink === routeLink) || (item.routeRegex && new RegExp(item.routeRegex).test(routeLink + '/'));
      });
    }

    if (matchingItem) {
      return matchingItem[prop];
    }

    return;
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
  private buildRouteRegExp({ path, ...rest }) {
    // ensure leading slash is provided in the path
    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (path.includes(this.pathParamPrefix)) {
      // replace mathing path param with a regex
      // '/mentor/:id' becomes '/mentor/[^/]', which further will be matched in updateStore
      const routeRegex = path.replace(new RegExp(this.pathParamRegexIdentifier, 'g'), this.pathParamRegexReplacer);
      return { routeRegex, ...rest };
    } else {
      return { routeLink: path, ...rest };
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
      const breacrumbsToShow = this.currentBreadcrumbs.filter(breadcrumb => !breadcrumb.skip && breadcrumb.label);
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
   * get immediate child of a module or Component
   * empty child is the one with path: ''
   *
   */
  private getImmediateBaseChildData(routeConfig): BreadcrumbData {
    let baseChild;

    if (routeConfig.loadChildren) {
      // To handle a module with empty child route
      baseChild = routeConfig._loadedConfig.routes.find(route => route.path === '');
    } else if (routeConfig.children) {
      // To handle a component with empty child route
      baseChild = routeConfig.children.find(route => route.path === '');
    }
    return baseChild && baseChild.data;
  }

  /**
   * When parent and it's children (that has empty route path) define data
   * merge them both with child taking precedence
   *
   */
  private mergeParentWithChild(parentData: BreadcrumbData = {}, childData: BreadcrumbData = {}): BreadcrumbData {
    return { ...parentData, ...childData };
  }
}
