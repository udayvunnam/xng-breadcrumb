import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
  OnDestroy,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbItemDirective } from './breadcrumb-item.directive';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './breadcrumb';

@Component({
  selector: 'xng-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  breadcrumbs: Breadcrumb[];
  breadcrumbs$: Observable<Breadcrumb[]>;
  separatorTemplate: TemplateRef<void>;
  private _separator = '/';

  /**
   * Breadcrumb item can be customized with this template
   * Template context is provided label, additional info, first and last indexes
   * Use cases:
   * 1) Add an icon along with label
   * 2) i18n. {{breadcrumb | translate}} or {{breadcrumb | transloco}}
   * 3) Change text case {{breadcrumb | titlecase}}
   */
  @ContentChild(BreadcrumbItemDirective, { static: false, read: TemplateRef })
  itemTemplate;

  /**
   * If true, breadcrumb is auto generated even without any mapping label
   * Default label is same as route segment
   */
  @Input() autoGenerate = true;

  /**
   * By default query params will be preserved with breadcrumbs
   */
  @Input() preserveQueryParams = true;

  /**
   * By default query fragments will be preserved with breadcrumbs
   */
  @Input() preserveFragment = true;

  /**
   * custom class provided by consumer to increase specificity
   * This will benefit to override styles that are conflicting
   */
  @Input() class = '';

  /**
   * separator between breadcrumbs, defaults to '/'.
   * User can customize separator either by passing a String or Template
   *
   * String --> Ex: <xng-breadcrumb separator="-"> </xng-breadcrumb>
   *
   * Template --> Ex: <xng-breadcrumb [separator]="separatorTemplate"> </xng-breadcrumb>
   * <ng-template #separatorTemplate><mat-icon>arrow_right</mat-icon></ng-template>
   */
  @Input('separator')
  set separator(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.separatorTemplate = value;
      this._separator = undefined;
    } else {
      this.separatorTemplate = undefined;
      this._separator = value || '/';
    }
  }
  get separator() {
    return this._separator;
  }

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.subscription = this.breadcrumbService.breadcrumbs$.subscribe(
      (breadcrumbs) => {
        this.breadcrumbs = breadcrumbs
          .map((breadcrumb) => {
            if (!this.preserveQueryParams) {
              breadcrumb.routeLink = breadcrumb.routeLink.split('?')[0];
            }
            if (!this.preserveFragment) {
              breadcrumb.fragment = undefined;
            }
            return breadcrumb;
          })
          .filter((breadcrumb) => {
            // Usually, breadcrumb list can contain a combination of auto generated and user specified labels
            // this filters autogenerated labels in case of "[autoGenerate]: false"
            if (this.autoGenerate) {
              return true;
            }
            return !breadcrumb.isAutoGeneratedLabel;
          });
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
