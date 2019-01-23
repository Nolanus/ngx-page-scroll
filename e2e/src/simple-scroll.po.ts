import { by, element, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class SimpleScrollPage extends AppPage {

  getPath(): string {
    return '/simple';
  }

  triggerLastHeadingButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#goToLastHeadingButton'));
  }

  triggerOffsetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#offsetButton'));
  }

  triggerNegativeOffsetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#negativeOffsetButton'));
  }

  triggerFinishButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#finishEventButton'));
  }

  triggerDynamicTargetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#dynamicTargetButton'));
  }

  selectDifferentDynamicScrollTarget(): promise.Promise<any> {
    const select: ElementFinder = element(by.css('#dynamicTargetSelect'));

    this.scrollToElement(select);
    select.click();
    return element(by.css('#mat-option-1')).click();
  }

  triggerToTopWithSpeedButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('#toTopWithSpeed'));
  }

  getHead1VerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#head1'));
  }

  getHead7VerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#head7'));
  }

  getHead10VerticalPosition(): promise.Promise<number> {
    return this.getVerticalPosition(by.css('#head10'));
  }

}
