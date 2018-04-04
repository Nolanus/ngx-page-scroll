import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxPageScrollServiceProvider } from './ngx-page-scroll.service';
import { PageScroll } from './ngx-page-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PageScroll],
    exports: [PageScroll],
    providers: [NgxPageScrollServiceProvider]
})
export class NgxPageScrollModule {
}
