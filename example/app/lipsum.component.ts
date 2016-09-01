import {Component, ViewChild, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NgFor} from '@angular/common';

import {PageScroll, PageScrollService, PageScrollInstance} from 'ng2-page-scroll';

@Component({
    templateUrl: './app/lipsum.component.html',
    directives: [PageScroll, NgFor, ROUTER_DIRECTIVES],
    providers: [PageScrollService],
    styles: ['#container {height:100px;overflow:auto;}']
})
export class LipsumComponent {
    array: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    constructor() {

    }

    @ViewChild('container') private container: ElementRef;

    goToAnchorHead11() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.container.nativeElement.ownerDocument, '#head11');
        PageScrollService.start(pageScrollInstance);
    };

    goToAnchorByParentSelector() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(this.container.nativeElement.ownerDocument, '#inContainer', this.container.nativeElement);
        PageScrollService.start(pageScrollInstance);
    }
}
