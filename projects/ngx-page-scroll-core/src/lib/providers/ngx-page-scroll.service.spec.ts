import { TestBed } from '@angular/core/testing';

import { PageScrollService } from './ngx-page-scroll.service';
import { defaultPageScrollConfig, NGXPS_CONFIG } from './config.provider';

describe('PageScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig },
    ],
  }));

  it('should be created', () => {
    const service: PageScrollService = TestBed.inject(PageScrollService);
    expect(service).toBeTruthy();
  });
});
