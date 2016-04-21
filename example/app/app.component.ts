import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {PageScroll} from 'ng2-page-scroll';
import {FrontComponent} from './front.component';
import {LipsumComponent} from './lipsum.component';
import {ContactComponent} from './contact.component';

@Component({
    selector: 'my-app',
    template: `
        <h1 id="head">My First Angular 2 App</h1>
        <nav>
            <a [routerLink]="['Front']">Front Page</a>
            <a [routerLink]="['Front']" pageScroll href="#anchor2">Front anchor</a>
            <a [routerLink]="['About']">About</a>
            <a [routerLink]="['About']" pageScroll href="#head2">About anchor</a>
            <a [routerLink]="['Contact']">Contact</a>
        </nav>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, PageScroll]
})
@RouteConfig([
    {path: '/', name: 'Front', component: FrontComponent},
    {path: '/about', name: 'About', component: LipsumComponent},
    {path: '/contact', name: 'Contact', component: ContactComponent}
])
export class AppComponent {
}