/**
 * Created by sebastianfuss on 03.09.16.
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {PageScrollService} from './ng2-page-scroll.service';
import {PageScroll} from './ng2-page-scroll.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [PageScroll],
    exports: [PageScroll],
    providers: [
        {provide: PageScrollService, useClass: PageScrollService}
    ]
})
export class Ng2PageScrollModule {
}
