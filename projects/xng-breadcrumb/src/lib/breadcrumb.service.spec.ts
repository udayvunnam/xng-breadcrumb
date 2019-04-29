import { TestBed } from '@angular/core/testing';

import { BreadcrumbService } from './breadcrumb.service';

describe('XngBreadcrumbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreadcrumbService = TestBed.get(BreadcrumbService);
    expect(service).toBeTruthy();
  });
});
