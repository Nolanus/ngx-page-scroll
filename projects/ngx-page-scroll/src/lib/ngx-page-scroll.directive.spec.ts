import { TestBed } from '@angular/core/testing';
import { NgxPageScrollDirective } from './ngx-page-scroll.directive';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

describe('NgxPageScrollDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxPageScrollCoreModule.forRoot()]
    });
  });

  it('should create an instance', () => {
    const directive = TestBed.runInInjectionContext(() => new NgxPageScrollDirective());
    expect(directive).toBeTruthy();
  });
});
