import { by, element } from 'protractor';
import { AppPage } from './app.po';

export class HomePage extends AppPage {

  getPath(): string {
    return '/';
  }

  getTitleText() {
    return element(by.css('#title')).getText();
  }
}
