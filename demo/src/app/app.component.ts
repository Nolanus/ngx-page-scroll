import {Component, ElementRef, Inject} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from "@angular/platform-browser";
import {Router, NavigationEnd} from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private router: Router) {
        router.events.subscribe((event) => {
            // see also
            if (event instanceof NavigationEnd) {
                this.links.forEach((link, index) => {
                    if (router.isActive(router.createUrlTree(link.route), false)) {
                        this.currentTabIndex = index;
                    }
                });
            }
        });
    }

    public currentTabIndex: number = 0;

    public links = [
        {
            route: ['/'],
            name: 'Home'
        },
        {
            route: ['/simple'],
            name: 'Simple Scrolling'
        },
        {
            route: ['/nested'],
            name: 'Nested Scrolling'
        },
        {
            route: ['/horizontal'],
            name: 'Horizontal Scrolling'
        },
        {
            route: ['/translated'],
            name: 'Transformed Target Scrolling'
        }];

    public tabChange(event: any) {
        // Select the correct route for that tab
        let routeObj = this.links[event.index];
        if (routeObj && routeObj.route) {
            this.router.navigate(routeObj.route);
        }
    }

}
