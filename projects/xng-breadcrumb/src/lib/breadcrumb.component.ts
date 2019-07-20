import { OnInit, Component, Input } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'xng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<any[]>;
  /**
   * If true, breacrumb is formed even without any configuration
   * Default mapping is same as route path with intial letter capitalized
   *
   */
  @Input() defaultMapping = true;

  /**
   * separator between breadcrumbs
   * defaults to '/'. Other options could be '.' or '-' or '>' etc.
   *
   */
  @Input() separator = '/';

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.defaultMapping = this.defaultMapping;
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }
}
