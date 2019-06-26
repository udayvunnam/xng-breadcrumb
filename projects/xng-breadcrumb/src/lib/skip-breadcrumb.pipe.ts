import { Pipe, PipeTransform } from '@angular/core';
import { Breadcrumb } from './breadcrumb';

@Pipe({
  name: 'skipBreadcrumb',
  pure: true
})
export class SkipBreadcrumbPipe implements PipeTransform {
  transform(list: Breadcrumb[], args?: any): any {
    if (!list) {
      return;
    }
    return list.filter(breadcrumb => !breadcrumb.skip);
  }
}
