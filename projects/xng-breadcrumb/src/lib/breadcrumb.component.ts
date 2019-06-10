import { OnInit, Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';
import { Observable } from 'rxjs';

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
  @Input() defaultRouteMapping = true;

  /**
   * Seperator between breadcrumbs
   * defaults to '/'. Other options could be '.' or '-' or '>' etc.
   *
   */
  @Input() seperator = '/';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => this.breadcrumbService.setBreadcrumb(this.activatedRoute.root));
  }

  ngOnInit() {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }
}
