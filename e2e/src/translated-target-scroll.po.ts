import { by, element, ElementFinder } from 'protractor';
import { ILocation, promise } from 'selenium-webdriver';
import { AppPage } from './app.po';

export class TranslatedTargetScrollPage extends AppPage {

  getPath(): string {
    return '/translated';
  }

  triggerUntranslatedTargetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('button[href="#untranslated"]'));
  }

  triggerTranslatedTargetButton(): promise.Promise<any> {
    return this.triggerAButton(by.css('button[href="#translated"]'));
  }

  getTranslatedTargetLocation(): promise.Promise<ILocation> {
    return element(by.css('#translated')).getLocation();
  }

  getUntranslatedTargetLocation(): promise.Promise<ILocation> {
    return element(by.css('#untranslated')).getLocation();
  }
}
