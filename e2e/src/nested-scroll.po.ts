import { by } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class NestedScrollPage extends AppPage {

  getPath(): string {
    return '/nested';
  }

  triggerNestedScrollButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#startNestedScrollingButton'));
  }

  triggerNestedScrollButton2(): promise.Promise<any> {
    return this.triggerAButton(by.css('#startNestedScrollingButton2'));
  }

  getBasicScrollTargetOffsetTop(): promise.Promise<number> {
    return this.getOffsetTop(by.css('#basicScrollTarget'));
  }

  getBasicContainerScrollTop(): promise.Promise<number> {
    return this.getScrollTop(by.css('#basicContainer'));
  }

  getComplexContainerScrollTop(): promise.Promise<number> {
    return this.getScrollTop(by.css('#complexContainer'));
  }

  getComplexContainerTargetVerticalPosition(): promise.Promise<any> {
    return this.getVerticalPosition(by.css('#complexContainer'));
  }

  getComplexScrollTargetVerticalPosition(): promise.Promise<any> {
    return this.getVerticalPosition(by.css('#complexScrollTarget'));
  }
}
