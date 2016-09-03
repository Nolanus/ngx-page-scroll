import {Component, ElementRef, Inject} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public constructor(@Inject(DOCUMENT) private document: Document, private pageScrollService: PageScrollService) {
    }

    goToLastHeading(){
        let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#head11');
        this.pageScrollService.start(pageScrollInstance);
    }

    title = 'app works!';

    array: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}
