import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {MdCheckbox} from '@angular/material';
import {PageScrollConfig} from 'ng2-page-scroll';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public isDebugEnabled = PageScrollConfig._logLevel >= 5;

    constructor(private router: Router, private route: ActivatedRoute) {
        router.events.subscribe((event) => {
            // see also
            if (event instanceof NavigationEnd) {
                this.links.forEach((link, index) => {
                    if (link.route[0] === event.url) {
                        this.currentTabIndex = index;
                    }
                });
            }
        });
    }

    public setDebug(debug: {checked: boolean, source: MdCheckbox}) {
        console.warn('Debug mode has been ' + (debug.checked ? 'en' : 'dis') + 'abled');
        this.isDebugEnabled = debug.checked;
        PageScrollConfig._logLevel = this.isDebugEnabled ? 5 : 2;
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
