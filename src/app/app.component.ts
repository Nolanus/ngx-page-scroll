import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  public currentTabIndex = 0;
  public links = [
    {
      route: ['/'],
      name: 'Home',
    },
    {
      route: ['/simple'],
      name: 'Simple Scrolling',
    },
    {
      route: ['/nested'],
      name: 'Nested Scrolling',
    },
    {
      route: ['/router'],
      name: 'Router Scrolling',
    },
    {
      route: ['/horizontal'],
      name: 'Horizontal Scrolling',
    },
    {
      route: ['/translated'],
      name: 'Trnsf. Target Scrolling',
    },
    {
      route: ['/namespace'],
      name: 'Namespace Feature',
    }];

  constructor(private readonly router: Router, private readonly pageScrollService: PageScrollService) {
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

  public tabChange(event: any): void {
    // Select the correct route for that tab
    const routeObj = this.links[event.index];
    if (routeObj && routeObj.route) {
      this.router.navigate(routeObj.route);
    }
  }
}
