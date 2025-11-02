/*
 * Public API Surface of ngx-page-scroll-core
 */

export { NgxPageScrollCoreModule } from './lib/ngx-page-scroll-core.module';

export { defaultPageScrollConfig, NGXPS_CONFIG } from './lib/providers/config.provider';
export { PageScrollService } from './lib/providers/ngx-page-scroll.service';

export { EasingLogic } from './lib/types/easing-logic';
export { PageScrollInstance, InterruptReporter, PageScrollOptions } from './lib/page-scroll-instance';
export { PageScrollTarget } from './lib/types/page-scroll-target';
export { PageScrollViews } from './lib/types/page-scroll-view';
export { PageScrollConfig } from './lib/types/page-scroll.config';
