import {Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'app-nested-scroll',
    templateUrl: './nested-scroll.component.html',
    styleUrls: ['./nested-scroll.component.css']
})
export class NestedScrollComponent implements OnInit {

    @ViewChild('container')
    private container: ElementRef;

    constructor(@Inject(DOCUMENT) private document: Document, private pageScrollService: PageScrollService) {
    }

    ngOnInit() {
    }


    public scrollInside() {
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInlineInstance(this.document, '#inContainer', this.container.nativeElement);
        this.pageScrollService.start(pageScrollInstance);
    }
}
