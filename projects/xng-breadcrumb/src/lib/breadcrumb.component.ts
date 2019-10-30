import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';

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
