import { TestBed } from '@angular/core/testing';

import { XngBreadcrumbsService } from './xng-breadcrumbs.service';

describe('XngBreadcrumbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XngBreadcrumbsService = TestBed.get(XngBreadcrumbsService);
    expect(service).toBeTruthy();
  });
});
