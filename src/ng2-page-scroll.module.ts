import {CommonModule} from '@angular/common';
import {NgModule, ModuleWithProviders} from '@angular/core';

import {NG2PAGESCROLL_SERVICE_PROVIDER, PageScrollService} from './ng2-page-scroll.service';
import {PageScroll} from './ng2-page-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PageScroll],
    exports: [PageScroll],
    providers: [NG2PAGESCROLL_SERVICE_PROVIDER]
})
export class Ng2PageScrollModule {
    /** @deprecated since v4.0.0-beta.10 (https://github.com/Nolanus/ng2-page-scroll/pull/190) */
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: Ng2PageScrollModule,
            providers: [
                {provide: PageScrollService, useClass: PageScrollService}
            ]
        };
    }
}
