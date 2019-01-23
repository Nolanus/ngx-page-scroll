import { browser, protractor } from 'protractor';
import { Util as Closeness } from './util';
import { NestedScrollPage } from './nested-scroll.po';

describe('Nested Scrolling page', () => {
  let page: NestedScrollPage;

  beforeEach(() => {
    page = new NestedScrollPage();
    page.navigateTo();
  });

  it('should scroll to the inline button when the inside scroll is at the top', () => {
    page.getBasicContainerScrollTop().then((initialScrollTop) => {
      expect(initialScrollTop).toEqual(0);
      page.triggerNestedScrollButton().then(() => {
        browser.sleep(1250).then(() => {
          page.getBasicContainerScrollTop().then((pos) => {
            // Now the scrollTop value of the container should be the exact same value like
            // the offsetTop of the nested element
            expect(page.getBasicScrollTargetOffsetTop()).toBeCloseTo(+pos, Closeness.ofByOne);
          });
        });
      });
    });
  });

  it('should scroll to the inline button when the inside scroll is at the bottom', () => {
    // Cause the scroll container to be scrolled to the end
    browser.driver.executeScript('document.getElementById(\'basicContainer\').scrollTop =' +
      ' document.getElementById(\'basicContainer\').scrollHeight');

    page.getBasicContainerScrollTop().then((initialScrollTop) => {
      expect(initialScrollTop).toBeGreaterThan(0);
      page.triggerNestedScrollButton().then(() => {
        browser.sleep(1250).then(() => {
          page.getBasicContainerScrollTop().then((pos) => {
            // Now the scrollTop value of the container should be the exact same value like
            // the offsetTop of the nested element
            expect(page.getBasicScrollTargetOffsetTop()).toBeCloseTo(+pos, Closeness.ofByOne);
          });
        });
      });
    });
  });

  it('should scroll to the inline button with multiple relative positioned in-between parents' +
    ' and advanced position calculation', () => {
    page.getComplexContainerScrollTop().then((initialScrollTop) => {
      expect(initialScrollTop).toEqual(0);
      page.triggerNestedScrollButton2().then(() => {
        browser.sleep(1250).then(() => {
          protractor.promise.all([page.getComplexContainerTargetVerticalPosition(), page.getComplexScrollTargetVerticalPosition()])
            .then(positions => {
              expect(positions[0]).toBeCloseTo(positions[1], Closeness.ofByOne);
            });
        });
      });
    });
  });

  it('should scroll to the inline button with multiple relative positioned in-between parents' +
    ' and advanced position calculation when the container is scrolled to the bottom', () => {
    // Cause the scroll container to be scrolled to the end
    browser.driver.executeScript('document.getElementById(\'complexContainer\').scrollTop =' +
      ' document.getElementById(\'complexContainer\').scrollHeight');

    page.getComplexContainerScrollTop().then((initialScrollTop: number) => {
      expect(initialScrollTop).toBeGreaterThan(0);
      page.triggerNestedScrollButton2().then(() => {
        browser.sleep(1250).then(() => {
          protractor.promise.all([page.getComplexContainerTargetVerticalPosition(), page.getComplexScrollTargetVerticalPosition()])
            .then(locations => {
              expect(locations[0]).toBeCloseTo(locations[1], Closeness.ofByOne);
            });
        });
      });
    });
  });

});
