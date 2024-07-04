import { TestBed } from '@angular/core/testing';

import { PageScrollService } from './ngx-page-scroll.service';
import { defaultPageScrollConfig, NGXPS_CONFIG } from './config.provider';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

describe('PageScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[MatIconModule, MatSelectModule],
    providers: [
      { provide: NGXPS_CONFIG, useValue: defaultPageScrollConfig },
    ],
  }));

  it('should be created', () => {
    const service: PageScrollService = TestBed.inject(PageScrollService);
    expect(service).toBeTruthy();
  });
});
