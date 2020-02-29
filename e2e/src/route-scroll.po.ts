import { by, element } from 'protractor';
import { ILocation, promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class RouteScrollPage extends AppPage {

  getPath(): string {
    return '/router';
  }

  getHead3VerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#head3'));
  }

  getHead7VerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#head7'));
  }

  getDifferentRouteScrollButtonRouterLink(): promise.Promise<string> {
    return element(by.css('#differentRouteScroll')).getAttribute('routerLink');
  }

  triggerDifferentRouteScroll(): promise.Promise<any> {
    return this.triggerAButton(by.css('#differentRouteScroll'));
  }

  getDifferentRouteScrollWithFragmentButtonRouterLink(): promise.Promise<string> {
    return element(by.css('#differentRouteScrollWithFragment')).getAttribute('routerLink');
  }

  triggerDifferentRouteScrollWithFragment(): promise.Promise<any> {
    return this.triggerAButton(by.css('#differentRouteScrollWithFragment'));
  }

  getDemoScrollButtonRouterLink(): promise.Promise<string> {
    return element(by.css('#demoScroll2')).getAttribute('routerLink');
  }

  triggerDemoScroll(): promise.Promise<any> {
    return this.triggerAButton(by.css('#demoScroll2'));
  }

  triggerRouteScrollType1(): promise.Promise<any> {
    return this.triggerAButton(by.css('#currentRouteScroll1'));
  }

  triggerRouteScrollType2(): promise.Promise<any> {
    return this.triggerAButton(by.css('#currentRouteScroll2'));
  }

  triggerRouteScrollType3(): promise.Promise<any> {
    return this.triggerAButton(by.css('#currentRouteScroll3'));
  }
}
