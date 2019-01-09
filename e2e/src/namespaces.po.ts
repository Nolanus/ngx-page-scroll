import { browser, ElementFinder } from 'protractor';
import { AppPage } from './app.po';

export class NamespaceScrollPage extends AppPage {

  getPath(): string {
    return '/namespace';
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
