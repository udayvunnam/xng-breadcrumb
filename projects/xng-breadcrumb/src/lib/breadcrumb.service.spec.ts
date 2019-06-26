import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbService } from './breadcrumb.service';

describe('XngBreadcrumbService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([])]
    })
  );

  it('should be created', () => {
    const service: BreadcrumbService = TestBed.get(BreadcrumbService);
    expect(service).toBeTruthy();
  });
});
