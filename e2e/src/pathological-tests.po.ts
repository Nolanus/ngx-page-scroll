import { by, element, ElementFinder } from 'protractor';
import { ILocation, promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class PathologicalTestsPage extends AppPage {

  getPath(): string {
    return '/tests';
  }
}
