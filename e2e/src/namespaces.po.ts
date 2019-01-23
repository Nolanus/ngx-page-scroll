import { browser, by, element, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class NamespaceScrollPage extends AppPage {

  getPath(): string {
    return '/namespace';
  }

  getContainer1ScrollTop(): promise.Promise<number> {
    return this.getScrollTop(by.css('#container1'));
  }

  getContainer2ScrollTop(): promise.Promise<number> {
    return this.getScrollTop(by.css('#container2'));
  }

  getContainer3ScrollTop(): promise.Promise<number> {
    return this.getScrollTop(by.css('#container3'));
  }

  getTarget2OffsetTop(): promise.Promise<number> {
    return this.getOffsetTop(by.css('#scrollTarget2'));
  }

  getTarget3OffsetTop(): promise.Promise<number> {
    return this.getOffsetTop(by.css('#scrollTarget3'));
  }

  triggerDefaultNamespaces(): promise.Promise<any> {
    return this.triggerAButton(by.css('#startDefaultNamespaceScrollsButton'));
  }

  triggerDefaultAndCustomNamespaceScroll(): promise.Promise<any> {
    return this.clickButtonsSimultaneously(
      element(by.css('#startDefaultNamespaceScrollsButton')),
      element(by.css('#startCustomNamespaceScrollsButton')));
  }

  scheduleStopButtonClick(): promise.Promise<any> {
    return browser.driver.executeScript(
      'var button = arguments[0]; setTimeout(function(){button.click()}, 1500)',
      element(by.css('#stopAllNamespaceScrollsButton')).getWebElement()
    );
  }

  /**
   * Click two buttons shortly after another. Protractor would wait for the click action
   * to finish before pressing the next one, thus we use executeScript directly
   */
  clickButtonsSimultaneously(...buttons: ElementFinder[]) {
    return browser.driver.executeScript(
      'arguments[0].forEach(function(arg){arg.click()});',
      buttons.map(button => button.getWebElement())
    );
  }
}
