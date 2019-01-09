import { by, element, ElementFinder } from 'protractor';
import { ILocation, promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class NestedScrollPage extends AppPage {

  getPath(): string {
    return '/nested';
  }
}
