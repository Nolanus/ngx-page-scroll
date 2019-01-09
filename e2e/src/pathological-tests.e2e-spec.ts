import { browser, by, element, ElementFinder, protractor } from 'protractor';
import { ILocation } from 'selenium-webdriver';
import { PathologicalTestsPage } from './pathological-tests.po';

describe('Pathological Tests page', () => {

  let page: PathologicalTestsPage;

  beforeEach(() => {
    page = new PathologicalTestsPage();
    page.navigateTo();
  });

  it('should scroll stop scroll animation when interruption event occurs', () => {
    const target: ElementFinder = element(by.css('#scrollTarget'));
    const trigger: ElementFinder = element(by.css('#interruptScroll'));
    target.getLocation().then((headingLocation: ILocation) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        trigger.sendKeys(protractor.Key.ENTER).then(() => {
          browser.sleep(400).then(() => {
            const snackbar = element(by.css('simple-snack-bar'));
            const snackbarButton = snackbar.element(by.css('button'));
            snackbar.getText().then(function (text) {
              expect(text).toContain('Ohoh, something interrupted us');
            });
            snackbarButton.click();
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeLessThan(headingLocation.y);
              expect(pos).toBeGreaterThan(initialPos);
            });
          });
        });
      });
    });
  });

  it('should not change scroll position when trying to scroll to non existing target and trigger scrollFinish event', () => {
    const nonExistingTargetButton: ElementFinder = element(by.css('#nonExistingTargetButton'));
    browser.executeScript('arguments[0].scrollIntoView();', nonExistingTargetButton.getWebElement()).then(() => {
      page.getScrollPos().then((initialPos: number) => {
        nonExistingTargetButton.sendKeys(protractor.Key.ENTER).then(() => {
          browser.sleep(500).then(() => {
            const snackbar = element(by.css('simple-snack-bar'));
            const snackbarButton = snackbar.element(by.css('button'));
            snackbar.getText().then(function (text) {
              expect(text).toContain('Ohoh, something interrupted us');
            });
            snackbarButton.click();
            page.getScrollPos().then((pos: number) => {
              // Should not be scrolled anywhere
              expect(pos).toBe(initialPos);
            });
          });
        });
      });
    });
  });

  it('should trigger scrollFinish event if target is already in view', () => {
    const trigger: ElementFinder = element(by.css('#alreadyAtTargetScroll'));
    page.scrollTo(0).then(() => {
      trigger.sendKeys(protractor.Key.ENTER).then(() => {
        browser.sleep(400).then(() => {
          const snackbar = element(by.css('simple-snack-bar'));
          const snackbarButton = snackbar.element(by.css('button'));
          snackbar.getText().then(function (text) {
            expect(text).toContain('Yeah, we reached our destination');
          });
          snackbarButton.click();
          page.getScrollPos().then((pos: number) => {
            expect(pos).toBe(0);
          });
        });

      });
    });
  });
});
