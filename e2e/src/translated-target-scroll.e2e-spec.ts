import { browser } from 'protractor';
import { TranslatedTargetScrollPage } from './translated-target-scroll.po';
import { ILocation } from 'selenium-webdriver';
import { Util as Closeness } from './util';

describe('Transformed Target Scroll page', () => {

  let page: TranslatedTargetScrollPage;

  beforeEach(() => {
    page = new TranslatedTargetScrollPage();
    page.navigateTo();
  });

  it('should scroll to the untranslated DOM element', () => {
    page.getUntranslatedTargetLocation().then((headingLocation: ILocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerUntranslatedTargetButton().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });

  it('should scroll to the CSS translated DOM element', () => {
    page.getTranslatedTargetLocation().then((headingLocation: ILocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerTranslatedTargetButton().then(() => {
          browser.sleep(1250).then(() => {
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeCloseTo(Math.round(headingLocation.y), Closeness.ofByOne);
            });
          });
        });
      });
    });
  });
});
