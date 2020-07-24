import { by, element } from 'protractor';
import { AppPage } from './app.po';
import { promise } from 'selenium-webdriver';

export class HomePage extends AppPage {

  getPath(): string {
    return '/';
  }

  getTitleText(): promise.Promise<string> {
    return element(by.css('#title')).getText();
  }
}
