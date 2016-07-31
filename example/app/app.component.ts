import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {PageScroll} from 'ng2-page-scroll';

@Component({
    selector: 'my-app',
    template: `
        <h1 id="head">My First Angular 2 App</h1>
        <nav>
            <a [routerLink]="['/']">Front Page</a>
            <a [routerLink]="['/']" pageScroll href="#anchor2">Front anchor</a>
            <a [routerLink]="['/about']">About</a>
            <a [routerLink]="['/about']" pageScroll href="#head2" [pageScrollEnable]="false">About anchor</a>
            <a [routerLink]="['/contact']">Contact</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, PageScroll]
})
export class AppComponent {
}