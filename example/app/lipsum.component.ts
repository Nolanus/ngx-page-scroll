import {Component, ViewChild, ElementRef, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {NgFor} from '@angular/common';

import {PageScroll, PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    templateUrl: './app/lipsum.component.html',
    directives: [PageScroll, NgFor, ROUTER_DIRECTIVES],
    styles: ['#container {height:100px;overflow:auto;}']
})
export class LipsumComponent {
    array: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    constructor(@Inject(DOCUMENT) private document: Document, private pageScrollService: PageScrollService) {

    }

    @ViewChild('container')
    private container: ElementRef;

    public goToAnchorHead11(): void {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#head11');
        this.pageScrollService.start(pageScrollInstance);
    };

    public goToAnchorByParentSelector(): void {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(this.document, '#inContainer', this.container.nativeElement);
        this.pageScrollService.start(pageScrollInstance);
    }
}
