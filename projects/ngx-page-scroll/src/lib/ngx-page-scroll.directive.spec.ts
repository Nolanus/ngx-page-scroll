import { NgxPageScrollDirective } from './ngx-page-scroll.directive';
import { defaultPageScrollConfig, PageScrollService } from 'ngx-page-scroll-core';

describe('NgxPageScrollDirective', () => {
  it('should create an instance', () => {
    const directive = new NgxPageScrollDirective(new PageScrollService(defaultPageScrollConfig), null, null);
    expect(directive).toBeTruthy();
  });
});
