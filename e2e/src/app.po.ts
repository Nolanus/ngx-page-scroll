import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { By, ILocation, promise } from 'selenium-webdriver';

export abstract class AppPage {

  abstract getPath(): string;

  navigateTo(): promise.Promise<any> {
    return browser.get(this.getPath()) as promise.Promise<any>;
  }

  scrollToElement(elm: ElementFinder): promise.Promise<{}> {
    return elm.getLocation().then(function (loc) {
      return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', loc.y);
    });
  }

  protected triggerAButton(selector: By): promise.Promise<any> {
    return element(selector).click();
  }

  protected getOffsetTop(selector: By): promise.Promise<number> {
    return element(selector).getAttribute('offsetTop').then((offsetTopString) => {
        return +offsetTopString;
    });
  }
  protected getScrollTop(selector: By): promise.Promise<number> {
    return element(selector).getAttribute('scrollTop').then((scrollTop) => {
        return +scrollTop;
    });
  }

  protected getVerticalPosition(selector: By): promise.Promise<number> {
    return element(selector).getLocation().then((headingLocation: ILocation) => {
      return headingLocation.y;
    });
  }

  getScrollPos(): promise.Promise<number> {
    return browser.driver.executeScript('return Math.round(window.pageYOffset);');
  }

  scrollTo(scrollPos: number): promise.Promise<any> {
    return browser.driver.executeScript('window.scrollTo(0,arguments[0]);', scrollPos);
  }

  getBodyScrollHeight(): promise.Promise<number> {
    const body: ElementFinder = element(by.css('body'));
    return body.getAttribute('scrollHeight').then((bodyScrollHeightString: string) => {
      return +bodyScrollHeightString;
    });
  }

  getWindowInnerHeight(): promise.Promise<number> {
    return browser.driver.executeScript('return window.innerHeight;');
  }
}
