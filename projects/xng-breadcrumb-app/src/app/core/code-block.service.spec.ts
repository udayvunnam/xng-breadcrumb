import { TestBed } from '@angular/core/testing';

import { CodeBlockService } from './code-block.service';

describe('CodeBlockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeBlockService = TestBed.get(CodeBlockService);
    expect(service).toBeTruthy();
  });
});
