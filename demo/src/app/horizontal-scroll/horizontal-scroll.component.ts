import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';

@Component({
    selector: 'app-horizontal-scroll',
    templateUrl: './horizontal-scroll.component.html',
    styleUrls: ['./horizontal-scroll.component.css']
})
export class HorizontalScrollComponent implements OnInit {

    @ViewChild('container')
    public container: ElementRef;

    constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
    }

    public scrollHorizontalStart() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineDirectionInstance(this.document, '#horizontalContainerStart', this.container.nativeElement, false);
        this.pageScrollService.start(pageScrollInstance);
    }

    public scrollHorizontal() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineDirectionInstance(this.document, '#inHorizontalContainer', this.container.nativeElement, false);
        this.pageScrollService.start(pageScrollInstance);
    }

    ngOnInit() {
    }

}
