import { TestBed } from '@angular/core/testing';
import { describe, expect } from 'jasmine';

import { PageScrollService } from './ngx-page-scroll.service';

describe('PageScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageScrollService = TestBed.get(PageScrollService);
    expect(service).toBeTruthy();
  });
});
