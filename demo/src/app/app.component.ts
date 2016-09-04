import {Component, ElementRef, Inject} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor() {
    }

    title = 'app works!';

}
