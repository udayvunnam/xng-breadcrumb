import { Directive } from '@angular/core';

/**
 * This directive is used to customize the breadcrumb label behavior
 * *xngBreadcrumbItem directive can be used in the child element of xng-breadcrumb
 * Usage: refer to demo app.component.html
 */
@Directive({
  selector: '[xngBreadcrumbItem]'
})
export class BreadcrumbItemDirective {
  constructor() {}
}
