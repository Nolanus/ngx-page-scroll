import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from './app.po';
import { promise } from 'selenium-webdriver';

export class EasingFunctionsPage extends AppPage {

  getPath(): string {
    return '/simple';
  }

  navigateTo(): promise.Promise<any> {
    const prom = super.navigateTo();

    beforeEach(() => {
      element(by.css('#debugCheckBox')).click();
    });

    return prom;
  }

  /**
   * Click two buttons shortly after another. Protractor would wait for the click action
   * to finish before pressing the next one, thus we use executeScript directly
   */
  clickButtonsSimultaneously(...buttons: ElementFinder[]): promise.Promise<unknown> {
    return browser.driver.executeScript(
      'arguments[0].forEach(function(arg){arg.click()});',
      buttons.map(button => button.getWebElement())
    );
  }
}
