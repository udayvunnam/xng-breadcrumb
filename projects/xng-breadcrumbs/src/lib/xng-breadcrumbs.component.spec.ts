import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XngBreadcrumbsComponent } from './xng-breadcrumbs.component';

describe('XngBreadcrumbsComponent', () => {
  let component: XngBreadcrumbsComponent;
  let fixture: ComponentFixture<XngBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XngBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XngBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
