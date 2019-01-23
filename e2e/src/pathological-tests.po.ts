import { by } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class PathologicalTestsPage extends AppPage {

  getPath(): string {
    return '/tests';
  }

  triggerInterruptScrollButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#interruptScroll'));
  }

  triggerNonExistingTargetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#nonExistingTargetButton'));
  }

  triggerAlreadyAtTargetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#alreadyAtTargetScroll'));
  }

  getScrollTargetVerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#scrollTarget'));
  }

}
