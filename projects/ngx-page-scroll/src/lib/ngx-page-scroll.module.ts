import { NgModule } from '@angular/core';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { NgxPageScrollDirective } from './ngx-page-scroll.directive';

@NgModule({
  declarations: [
    NgxPageScrollDirective,
  ],
  imports: [
    NgxPageScrollCoreModule,
  ],
  exports: [
    NgxPageScrollDirective,
  ],
})
export class NgxPageScrollModule {
}
