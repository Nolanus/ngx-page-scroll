/**
 * Created by sebastianfuss on 03.09.16.
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PageScrollService} from './ng2-page-scroll.service';
// import {PageScrollInstance} from './ng2-page-scroll-instance';
// import {PageScrollConfig} from './ng2-page-scroll-config';
import {PageScroll} from './ng2-page-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PageScroll],
    providers: [
        {provide: PageScrollService, useClass: PageScrollService}
    ]
})
export class Ng2PageScrollModule {
}
