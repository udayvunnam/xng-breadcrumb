import { Directive } from '@angular/core';

/**
 * This directive is used to customize the breadcrumb label behavior
 * *xngBreadcrumbItem directive can be used in the child element of xng-breadcrumb
 * Usage: refer to the demo - app.component.html
 */
@Directive({
  selector: '[xngBreadcrumbItem]',
  standalone: true,
})
export class BreadcrumbItemDirective {}
