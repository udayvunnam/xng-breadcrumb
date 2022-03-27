import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

interface BaseComponent {
  isFormValid: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanDeactivate<BaseComponent> {
  constructor(private breadcrumbService: BreadcrumbService) {}

  canDeactivate(
    component: BaseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return window.confirm(
      'Are you sure you want to navigate away before saving changes?'
    );
  }
}
