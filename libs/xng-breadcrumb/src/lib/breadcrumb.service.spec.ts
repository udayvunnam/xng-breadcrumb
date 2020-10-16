import { TestBed } from '@angular/core/testing';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import 'zone.js/dist/zone-testing';

import { BreadcrumbService } from './breadcrumb.service';

describe('BreadcrumbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule.forRoot([])],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    });
  });

  it('should be created', async () => {
    const service: BreadcrumbService = TestBed.inject(BreadcrumbService);
    expect(service).toBeTruthy();
  });
});
