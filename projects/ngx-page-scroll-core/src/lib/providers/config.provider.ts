import { InjectionToken } from '@angular/core';
import { PageScrollConfig } from '../types/page-scroll.config';

export const NGXPS_CONFIG = new InjectionToken<PageScrollConfig>('ngxps_config');

export const defaultPageScrollConfig: PageScrollConfig = {
  _interval: 10,
  _logLevel: 1,
  namespace: 'default',
  verticalScrolling: true,
  duration: 1250,
  scrollOffset: 0,
  advancedInlineOffsetCalculation: false,
  interruptEvents: ['mousedown', 'wheel', 'DOMMouseScroll', 'mousewheel', 'keyup', 'touchmove'],
  interruptKeys: [33, 34, 35, 36, 38, 40],
  interruptible: true,
  easingLogic: (t: number, b: number, c: number, d: number): number => {
    // Linear easing
    return c * t / d + b;
  }
};
