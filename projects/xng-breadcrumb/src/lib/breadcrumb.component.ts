import { OnInit, Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'xng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() mode: 'material' | 'bootstrap';
  // If true, breacrumb is formed even without any configuration
  // Default mapping will be same as route paths
  @Input() defaultRouteMapping = true;

  breadcrumbs = [];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(event => this.breadcrumbService.setBreadcrumb(this.activatedRoute.root.firstChild));
  }

  ngOnInit() {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
