import { browser } from 'protractor';
import { PathologicalTestsPage } from './pathological-tests.po';

describe('Pathological Tests page', () => {

  let page: PathologicalTestsPage;

  beforeEach(() => {
    page = new PathologicalTestsPage();
    page.navigateTo();
  });

  it('should scroll stop scroll animation when interruption event occurs', () => {
    page.getScrollTargetVerticalPosition().then((headingLocation: number) => {
      page.getScrollPos().then((initialPos: number) => {
        expect(initialPos).toEqual(0);
        page.triggerInterruptScrollButton().then(() => {
          browser.sleep(400).then(() => {
            page.getSnackBarText().then(function (text) {
              expect(text).toContain('Ohoh, something interrupted us');
            });
            page.closeSnackBar();
            page.getScrollPos().then((pos: number) => {
              expect(pos).toBeLessThan(headingLocation);
              expect(pos).toBeGreaterThan(initialPos);
            });
          });
        });
      });
    });
  });

  it('should not change scroll position when trying to scroll to non existing target and trigger scrollFinish event', () => {
    page.getScrollPos().then((initialPos: number) => {
      page.triggerNonExistingTargetButton().then(() => {
        browser.sleep(500).then(() => {
          page.getSnackBarText().then(function (text) {
            expect(text).toContain('Ohoh, something interrupted us');
          });
          page.closeSnackBar();
          page.getScrollPos().then((pos: number) => {
            // Should not be scrolled anywhere
            expect(pos).toBe(initialPos);
          });
        });
      });
    });
  });

  it('should trigger scrollFinish event if target is already in view', () => {
    page.scrollTo(0).then(() => {
      page.triggerAlreadyAtTargetButton().then(() => {
        browser.sleep(400).then(() => {
          page.getSnackBarText().then(function (text) {
            expect(text).toContain('Yeah, we reached our destination');
          });
          page.closeSnackBar();
          page.getScrollPos().then((pos: number) => {
            expect(pos).toBe(0);
          });
        });

      });
    });
  });
});
